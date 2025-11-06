var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    // Map OpenAPI only for development
    app.MapOpenApi();
}
else
{
    // Enable HTTPS redirect only in non-development environments
    app.UseHttpsRedirection();
}


app.MapGet("/", () => "TreguAL API is running successfully 🚀");

app.Run();

