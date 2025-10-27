using dotlegalBackend.Messaging;
using dotlegalBackend.Services;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using dotlegalBackend.Data;
using dotlegalBackend.Messaging;
using dotlegalBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Config & DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<IApplicationService, ApplicationService>();
//builder.Services.AddSingleton<IMessageBus, RabbitMqMessageBus>();

builder.Services.AddControllers()
    .AddNewtonsoftJson();
// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173")  // React default port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Allow large uploads (tweak limits efter behov)
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 200_000_000; // f.eks. 200 MB
});

var app = builder.Build();

app.UseCors("AllowFrontend"); // Enable CORS

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
