using System;
using System.Threading.Tasks;
using dotlegalBackend.Dto;

namespace dotlegalBackend.Services
{
    public class AiService : IAiService
    {
        public Task<double> CalculateMatchScoreAsync(ApplicationCreateDto dto)
        {
            // Her kan du bruge OpenAI senere – for nu bare "fake" et resultat
            double score = new Random().Next(60, 100); // fx 60–100 %
            Console.WriteLine($"[AI] Calculated match score for {dto.Navn}: {score}");
            return Task.FromResult(score);
        }
    }
}
