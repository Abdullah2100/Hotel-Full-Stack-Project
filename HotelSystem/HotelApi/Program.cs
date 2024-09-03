
using System.Text;
using HotelApi.Injuction;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//injuction 
builder.Services.AddSingleton<IConfig, IconfigImplement>();



//auth

builder.Services.AddAuthentication(
      option =>
      {
          option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
          option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
      }
    )
    .AddJwtBearer(
        options =>
         {
             options.TokenValidationParameters = new TokenValidationParameters
             {
                 ValidateIssuer = true,
                 ValidateIssuerSigningKey = true,
                 ValidateLifetime = true,
                 ValidIssuer = builder.Configuration["Issuer"],
                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["SecretKey"] ?? "")),
                 ValidateAudience = false,
                 ClockSkew = TimeSpan.Zero
             };
         }
         );
builder.Services.AddAuthorization();



builder.Services.AddCors(options =>
{
    options.AddPolicy("justReact",
                 policy =>
                 {
                     policy.WithOrigins("http://localhost:5173")
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials();
                 });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

// app.UseFileServer(new FileServerOptions()
// {
//     FileProvider = new PhysicalFileProvider(
//         Path.Combine(Directory.GetCurrentDirectory(), @"Images")),
//     RequestPath = new PathString("/Images"),
//     EnableDirectoryBrowsing = true
// });

app?.UseFileServer(new FileServerOptions()
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), @"Images")),
    RequestPath = new PathString("/Images"),
    EnableDirectoryBrowsing = true,
});


app.UseCors("justReact");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.Run();