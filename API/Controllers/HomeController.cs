using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using API.Data;
using API.Modelos;

namespace API.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController
    {
        [HttpGet]
        public ActionResult Inicio(){
            return new ContentResult{
                ContentType = "text/html",
                Content = "<h1> API Colecao: Funcionou!!!</h1>"
            };
        }
    }
}