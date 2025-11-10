using Microsoft.AspNetCore.Http;


namespace dotlegalBackend.Dto
{
    public class ApplicationCreateDto // Data struktur for at oprette en ny ansøgning i systemet
    {
        public string Navn { get; set; }
        public string Adresse { get; set; }
        public string Telefon { get; set; }
        public string Email { get; set; }
        public string Titel { get; set; }
        public string Job { get; set; }

        public IFormFile Ansogning { get; set; }
        public IFormFile CV { get; set; }
        public IFormFile? Portefolje { get; set; }
        public IFormFile? Anbefaling { get; set; }
    }

}
