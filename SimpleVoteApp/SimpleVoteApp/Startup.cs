
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Authentication.Cookies;
using SimpleVoteApp.Helpers;
using SimpleVoteApp.Models;
using Microsoft.EntityFrameworkCore;

namespace SimpleVoteApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddControllers();

            services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
            services.AddDbContext<MyAppDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("MyAppDB")));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SimpleVoteApp", Version = "v1" });
            });
            services.AddScoped<JwtService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SimpleVoteApp v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(options => options
                .WithOrigins(new[] { "http://localhost:12888", "http://localhost:3000", "http://localhost:8080" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                );

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
