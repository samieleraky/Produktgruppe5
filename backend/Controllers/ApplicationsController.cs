using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotlegalBackend.Data;
using dotlegalBackend.Dto;
using dotlegalBackend.Services;

namespace dotlegalBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly ApplicationDbContext _context;
        private readonly IAiService _aiService; //  AI-service

        // 🧩 Constructor – vi injicerer AI-service i stedet for RabbitMQ
        public ApplicationsController(
            IApplicationService applicationService,
            ApplicationDbContext context,
            IAiService aiService)
        {
            _applicationService = applicationService;
            _context = context;
            _aiService = aiService;
        }

        //  1. Opret ansøgning og beregn matchscore direkte
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] ApplicationCreateDto dto)
        {
            // Gem ansøgningen i databasen
            var id = await _applicationService.CreateAsync(dto);

            // 🔮 Beregn matchscore via AI’en (direkte kald)
            var matchScore = await _aiService.CalculateMatchScoreAsync(dto);

            // 💾 Gem matchscore i databasen
            var application = await _context.Applications.FindAsync(id);
            if (application != null)
            {
                application.MatchScore = matchScore;
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                message = "Application received and scored by AI",
                applicationId = id,
                matchScore
            });
        }

        // 📊 2. Hent top 10 ansøgninger baseret på matchscore
        [HttpGet("top10")]
        public async Task<IActionResult> GetTop10()
        {
            var top10 = await _context.Applications
                .OrderByDescending(a => a.MatchScore)
                .ThenByDescending(a => a.CreatedAt)
                .Take(10)
                .Select(a => new
                {
                    a.Id,
                    a.Navn,
                    a.Email,
                    a.Telefon,
                    a.Job,
                    a.MatchScore,
                    a.AnsogningPath,
                    a.CvPath,
                    a.PortefoljePath,
                    a.AnbefalingPath
                })
                .ToListAsync();

            return Ok(top10);
        }

        // 🧮 3. Mulighed for manuelt at opdatere matchscore (hvis nødvendigt)
        [HttpPost("{id}/matchscore")]
        public async Task<IActionResult> UpdateMatchScore(Guid id, [FromBody] UpdateScoreDto dto)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null) return NotFound();

            app.MatchScore = dto.MatchScore;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Match score updated" });
        }

        public class UpdateScoreDto
        {
            public double MatchScore { get; set; }
        }
    }
}

