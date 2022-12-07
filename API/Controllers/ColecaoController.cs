using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Modelos;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColecaoController: Controller{
        private readonly TenisContext _context;
        public ColecaoController(TenisContext context){
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "dono, colecionador")]

        public ActionResult<List<Tenis>> GetAll(){
            return _context.Tenis.ToList();
        }

    }
}