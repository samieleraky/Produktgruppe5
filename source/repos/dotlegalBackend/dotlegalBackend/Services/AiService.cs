using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using dotlegalBackend.Dto;
using Microsoft.Extensions.Configuration;
using OpenAI;
using OpenAI.Chat;

namespace dotlegalBackend.Services
{
    public class AiService : IAiService
    {
        private readonly ChatClient _client;

        public AiService(IConfiguration config)
        {
            var apiKey = config["OpenAI:ApiKey"];
            var openAIClient = new OpenAIClient(apiKey);
            _client = openAIClient.GetChatClient("gpt-4o-mini");
        }

        public async Task<double> CalculateMatchScoreAsync(ApplicationCreateDto dto)
        {
            string prompt = $@"
You are an AI recruiter. 
Evaluate how well this applicant fits the job: {dto.Job}
Return ONLY a numeric score between 0 and 100 (no explanation).

Applicant details:
Name: {dto.Navn}
Education: {dto.Titel}
Address: {dto.Adresse}
Phone: {dto.Telefon}
Email: {dto.Email}
Job Applied For: {dto.Job}
";

            var messages = new List<ChatMessage>
            {
                new SystemChatMessage("You are a precise scoring assistant. Return only a number."),
                new UserChatMessage(prompt)
            };

            var response = await _client.CompleteChatAsync(messages);
            var messageContent = response.Value.Content[0].Text.Trim();

            if (double.TryParse(messageContent, out double score))
                return Math.Clamp(score, 0, 100);

            Console.WriteLine($"AI returned unexpected: {messageContent}");
            return 75; // Default fallback score
        }
    }
}