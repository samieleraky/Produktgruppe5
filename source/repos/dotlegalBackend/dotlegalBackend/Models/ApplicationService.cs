using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using dotlegalBackend.Data;
using dotlegalBackend.Dto;
using dotlegalBackend.Models;

namespace dotlegalBackend.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly ApplicationDbContext _context;
        private readonly string _uploadFolder;
        private readonly IAiService _aiService; // 🧠 AI service injected

        public ApplicationService(ApplicationDbContext context, IConfiguration config, IAiService aiService)
        {
            _context = context;
            _aiService = aiService; // <-- Injection her
            _uploadFolder = config["FileStorage:UploadFolder"] ?? "Uploads";
            Directory.CreateDirectory(_uploadFolder);
        }

        public async Task<Guid> CreateAsync(ApplicationCreateDto dto)
        {
            // 🗂️ Gem filer
            string ansogningPath = await SaveFile(dto.Ansogning);
            string cvPath = await SaveFile(dto.CV);
            string portefoljePath = dto.Portefolje != null ? await SaveFile(dto.Portefolje) : null;
            string anbefalingPath = dto.Anbefaling != null ? await SaveFile(dto.Anbefaling) : null;

            // 📄 Opret database-entitet
            var entity = new Application
            {
                Navn = dto.Navn,
                Adresse = dto.Adresse,
                Telefon = dto.Telefon,
                Email = dto.Email,
                Titel = dto.Titel,
                Job = dto.Job,
                AnsogningPath = ansogningPath,
                CvPath = cvPath,
                PortefoljePath = portefoljePath,
                AnbefalingPath = anbefalingPath
            };

            // 🧮 Brug AI-service til at beregne matchscore
            try
            {
                double matchScore = await _aiService.CalculateMatchScoreAsync(dto);
                entity.MatchScore = matchScore;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"⚠️ AI-score fejl: {ex.Message}");
                entity.MatchScore = new Random().Next(60, 90); // fallback
            }

            // 💾 Gem i database
            _context.Applications.Add(entity);
            await _context.SaveChangesAsync();

            return entity.Id;
        }

        private async Task<string> SaveFile(Microsoft.AspNetCore.Http.IFormFile file)
        {
            if (file == null) return null;
            var unique = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var path = Path.Combine(_uploadFolder, unique);
            using var stream = new FileStream(path, FileMode.Create);
            await file.CopyToAsync(stream);
            return path;
        }
    }
}
