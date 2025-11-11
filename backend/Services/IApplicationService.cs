using System;
using System.Threading.Tasks;
using dotlegalBackend.Dto;


namespace dotlegalBackend.Services
{
    public interface IApplicationService
    {
        Task<Guid> CreateAsync(ApplicationCreateDto dto);
    }
}
