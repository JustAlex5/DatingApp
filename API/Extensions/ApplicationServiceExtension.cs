using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Interface;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApllicationsService (this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<PresenceTracker>();
            services.Configure<ClouddinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));

            });
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            return services;
        }

        
    }
}
