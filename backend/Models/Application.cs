namespace dotlegalBackend.Models
{
    public class Application // Modelklasse, der repræsenterer en ansøgning i systemet
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Navn { get; set; }
        public string Adresse { get; set; }
        public string Telefon { get; set; }
        public string Email { get; set; }
        public string Titel { get; set; }
        public string Job { get; set; }

        // Fil-stier
        public string AnsogningPath { get; set; }
        public string CvPath { get; set; }
        public string? PortefoljePath { get; set; }
        public string? AnbefalingPath { get; set; }

        public double MatchScore { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
