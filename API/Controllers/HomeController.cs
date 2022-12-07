using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using API.Data;
using API.Modelos;

namespace ProjetoEscola_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly TenisContext? _context;

        public HomeController(IConfiguration configuration, TenisContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ActionResult<dynamic> Login([FromBody] User usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _context.Usuario
                .Where(u => u.username == usuario.username && u.senha == usuario.senha)
                .FirstOrDefault();

            if (user == null)
                return Unauthorized("Usuário ou senha inválidos");
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = GetToken(authClaims);
            user.senha = "";
            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), user = user });
        }

        [HttpGet]
        [Route("anonymous")]
        [AllowAnonymous]
        public string Anonymous() => "Anônimo";

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);

        [HttpGet]
        [Route("colecionador")]
        [Authorize(Roles = "colecionador, dono")]
        public string Colecionador() => "Colecionador";

        [HttpGet]
        [Route("dono")]
        [Authorize(Roles = "dono")]
        public string Dono() => "Dono";

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddHours(3),
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey,SecurityAlgorithms.HmacSha256)
            );

            return token;
        }
    }
}