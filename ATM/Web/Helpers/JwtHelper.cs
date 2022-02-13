using Entities.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Web.Helpers
{
    public class JwtHelper : IJwtHelper
    {
        private readonly IConfiguration _config;

        public JwtHelper(IConfiguration config)
        {
            _config = config;
        }
        public string GenerateToken(Tarjetum tarjeta)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Jwt:Key"]));
            var tokenDescription = new SecurityTokenDescriptor();
            tokenDescription.Subject = new ClaimsIdentity(new[] { new Claim("id",tarjeta.Id.ToString()) }); ;
            tokenDescription.Expires = DateTime.UtcNow.AddMinutes(15);
            tokenDescription.SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescription);

            return new JwtSecurityTokenHandler().WriteToken(createdToken);
        }
    }
}
