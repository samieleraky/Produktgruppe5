using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using dotlegalBackend.Dto;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using dotlegalBackend.Dto;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using OpenAI;
using OpenAI.Chat;
using UglyToad.PdfPig;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

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
            string cvText = await ExtractTextFromFile(dto.CV);
            string ansogningText = await ExtractTextFromFile(dto.Ansogning);
            string portefoljeText = dto.Portefolje != null ? await ExtractTextFromFile(dto.Portefolje) : "";
            string anbefalingText = dto.Anbefaling != null ? await ExtractTextFromFile(dto.Anbefaling) : "";

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
Education: {dto.Titel}
Job Applied For: {dto.Job}

Cover Letter:
{ansogningText}

CV:
{cvText}

{(string.IsNullOrEmpty(portefoljeText) ? "" : $"Portfolio:\n{portefoljeText}\n")}
{(string.IsNullOrEmpty(anbefalingText) ? "" : $"Recommendation:\n{anbefalingText}")}
";

            try
            {
                var messages = new List<ChatMessage>
                {
                    new SystemChatMessage("You are a precise scoring assistant. Return only a number."),
                    new UserChatMessage(prompt)
                };

                var response = await _client.CompleteChatAsync(messages);
                var messageContent = response.Value.Content[0].Text.Trim();

                if (double.TryParse(messageContent, out double score))
                    return Math.Clamp(score, 0, 100);

                Console.WriteLine($"⚠️ AI returned unexpected: {messageContent}");
                return 75;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"⚠️ AI error: {ex.Message}");
                return new Random().Next(60, 85);
            }
        }

        private async Task<string> ExtractTextFromFile(IFormFile file)
        {
            if (file == null) return string.Empty;

            var extension = Path.GetExtension(file.FileName).ToLower();
            string text = string.Empty;

            try
            {
                if (extension == ".pdf")
                {
                    using var stream = file.OpenReadStream();
                    using var pdf = PdfDocument.Open(stream);
                    foreach (var page in pdf.GetPages())
                        text += page.Text + "\n";
                }
                else if (extension == ".docx")
                {
                    var tempPath = Path.GetTempFileName();
                    try
                    {
                        using (var fs = new FileStream(tempPath, FileMode.Create))
                            await file.CopyToAsync(fs);

                        using (WordprocessingDocument doc = WordprocessingDocument.Open(tempPath, false))
                        {
                            var body = doc.MainDocumentPart?.Document?.Body;
                            text = body?.InnerText ?? "";
                        }
                    }
                    finally
                    {
                        if (File.Exists(tempPath))
                            File.Delete(tempPath);
                    }
                }
                else // .txt
                {
                    using var stream = file.OpenReadStream();
                    using var reader = new StreamReader(stream);
                    text = await reader.ReadToEndAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to read {file.FileName}: {ex.Message}");
            }

            return text.Length > 10000 ? text.Substring(0, 10000) : text;
        }
    }
}