using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using HotelApi.Injuction;
using Microsoft.IdentityModel.Tokens;

namespace HotelApi.Global
{
    public class Util
    {

        public static string generateJWt(IConfig config, int personID)
        {

            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config.configuration["SecretKey"] ?? "")
                );
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var ci = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, personID.ToString())
            };
            var token = new JwtSecurityToken(

                claims: ci,
                issuer: config.configuration["Issuer"],
                expires: DateTime.Now.AddHours(5),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
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