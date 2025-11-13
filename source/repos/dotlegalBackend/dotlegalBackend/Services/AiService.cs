using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using dotlegalBackend.Dto;
using Microsoft.Extensions.Configuration;
using OpenAI;
using OpenAI.Chat;
using UglyToad.PdfPig; //læser pdf
using Xceed.Words.NET; //læser docx

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
            // Læs filer som tekst
            string cvText = await ExtractTextFromFile(dto.CV); // CV er påkrævet
            string ansogningText = await ExtractTextFromFile(dto.Ansogning);
            string? portefoljeText = dto.Portefolje != null ? await ExtractTextFromFile(dto.Portefolje) : null; // valgfri
            string? anbefalingText = dto.Anbefaling != null ? await ExtractTextFromFile(dto.Anbefaling) : null;

            // Byg prompt
            string prompt = $@"
You are an AI recruiter. Evaluate how well this applicant fits the job '{dto.Job}'.

Consider:
- Education and skills relevance
- Experience level
- Writing quality and motivation (from cover letter)
- Overall professionalism

Return ONLY a numeric match score between 0 and 100 (no text, no explanation).

Applicant info:
Name: {dto.Navn}
Title: {dto.Titel}
Education: {dto.Uddannelse}
Experience: {dto.Erfaring}
Skills: {dto.Kompetencer}
Description: {dto.Beskrivelse}

Cover Letter:
{ansogningText}

CV:
{cvText}

Portfolio:
{portefoljeText}

Recommendation:
{anbefalingText}
";

            // Send til OpenAI
            var messages = new List<ChatMessage>
            {
                new SystemChatMessage("You are a precise scoring assistant. Return only a number."),
                new UserChatMessage(prompt) 
            };

            var response = await _client.CompleteChatAsync(messages);
            var messageContent = response.Value.Content[0].Text.Trim();

            if (double.TryParse(messageContent, out double score)) // Prøv at parse som double, og clamp mellem 0 og 100
                return Math.Clamp(score, 0, 100); 

            Console.WriteLine($"⚠️ AI returned unexpected: {messageContent}");
            return new Random().Next(60, 90); // fallback score
        }

        // Hjælpefunktion til at udtrække tekst fra filer
        private async Task<string> ExtractTextFromFile(IFormFile file)
        {
            if (file == null) return string.Empty; // Håndter null filer

            var extension = Path.GetExtension(file.FileName).ToLower(); // understøttede formater: .pdf, .docx, .txt

            using var stream = file.OpenReadStream();
            using var reader = new StreamReader(stream);
            string text = string.Empty;

            if (extension == ".pdf")
            {
                using var pdf = PdfDocument.Open(stream);
                foreach (var page in pdf.GetPages())
                    text += page.Text + "\n";
            }
            else if (extension == ".docx")
            {
                // Kopiér filen til temp, fordi Xceed kræver fysisk sti
                var tempPath = Path.GetTempFileName();
                using (var fs = new FileStream(tempPath, FileMode.Create))
                    await file.CopyToAsync(fs);
                using var doc = DocX.Load(tempPath);
                text = doc.Text;
                File.Delete(tempPath);
            }
            else
            {
                text = await reader.ReadToEndAsync();
            }

            return text.Length > 10000 ? text.Substring(0, 10000) : text; // Begræns længde for performance
        }
    }
}