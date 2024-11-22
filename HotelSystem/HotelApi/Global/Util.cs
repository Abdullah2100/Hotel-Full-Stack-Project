using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using HotelApi.Injuction;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace HotelApi.Global
{
    public class Util
    {

        public static string generateJWt(IConfig config, int personID)
        {
            var handler = new JwtSecurityTokenHandler();

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config.configuration["SecretKey"] ?? "")
                );
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var ci = new ClaimsIdentity();
            ci.AddClaim(
                 new Claim(ClaimTypes.NameIdentifier, personID.ToString())
            );
            DateTime todayDate = new DateTime();
            DateTime expireDate = DateTime.UtcNow.AddHours(1);
            var token = new SecurityTokenDescriptor
            {

                Subject = ci,
                Issuer = config.configuration["Issuer"],
                Expires = expireDate,
                SigningCredentials = credentials
            };
            var tokenHolder = handler.CreateToken(token);
            return handler.WriteToken(tokenHolder);
        }


        public static string hashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(data).Replace("-", "");
            }
        }


    }
}