using System.Threading.Tasks;
using dotlegalBackend.Dto;

namespace dotlegalBackend.Services
{
    public interface IAiService
    {
        Task<double> CalculateMatchScoreAsync(ApplicationCreateDto dto);
    }
}
