using Application.Interfaces;
using Application.Services;
using HelloWorld.Data;
using HelloWorld.Interfaces;
using HelloWorld.Services;
using HelloWorld.Services.Interfaces;
using HelloWorld.Services.Implementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using CloudinaryDotNet;



var builder = WebApplication.CreateBuilder(args);

/* =========================================================
 * Configuration
 * ========================================================= */
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

/* =========================================================
 * Services
 * ========================================================= */
builder.Services.AddControllers();
builder.Services.AddMemoryCache();
builder.Services.AddSingleton(sp =>
{
    var cfg = sp.GetRequiredService<IConfiguration>()
                .GetSection("Cloudinary");

    return new Cloudinary(new Account(
        cfg["CloudName"],
        cfg["ApiKey"],
        cfg["ApiSecret"]
    ));
});
/* Swagger + JWT */
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "TreguAL API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter: Bearer {your JWT token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

/* Dependency Injection */
builder.Services.AddScoped<DataDapper>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IHomeManager, HomeManager>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IAdminPostService, AdminPostService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IAdsService, AdsService>();

/* JWT */
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey!)
            ),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", p => p.RequireClaim("role_id", "4"));
    options.AddPolicy("BusinessOnly", p => p.RequireClaim("role_id", "3"));
    options.AddPolicy("SellerOnly", p => p.RequireClaim("role_id", "2"));
    options.AddPolicy("AnyLoggedIn", p => p.RequireAuthenticatedUser());
});

/* =========================================================
 * CORS
 * ========================================================= */
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(allowedOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

/* =========================================================
 * App
 * ========================================================= */
var app = builder.Build();

/* Error handling */
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

/* Swagger */
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/* =========================================================
 * Static Files
 * ========================================================= */

// wwwroot default
app.UseStaticFiles();

// -------- ADS --------
var adsPhysical = Path.Combine(
    builder.Environment.WebRootPath,
    "ads"
);

Directory.CreateDirectory(adsPhysical);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(adsPhysical),
    RequestPath = "/ads"
});

// -------- UPLOADS (POST IMAGES) --------
var uploadsPhysical = Path.Combine(
    builder.Environment.WebRootPath,
    "uploads"
);

Directory.CreateDirectory(uploadsPhysical);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPhysical),
    RequestPath = "/uploads"
});

/* ========================================================= */

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => new
{
    status = "OK",
    service = "TreguAL API",
    timestamp = DateTime.UtcNow
});

app.Run();
