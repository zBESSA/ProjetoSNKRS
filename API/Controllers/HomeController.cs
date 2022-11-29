using Microsoft.AspNetCore.Mvc;

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