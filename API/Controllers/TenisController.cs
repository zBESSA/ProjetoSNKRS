using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Modelos;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenisController: ControllerBase{
        private readonly TenisContext _context;
        public TenisController(TenisContext context){
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Tenis>> GetAll(){
            return _context.Tenis.ToList();
        }

        [HttpGet("{TenisId}")]
        public ActionResult<List<Tenis>> Get(int TenisId){
            try{
                var result = _context.Tenis.Find(TenisId);
                if(result == null){
                    return NotFound();
                }
                return Ok(result);
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Tenis model){
            try{
                _context.Tenis.Add(model);
                if(await _context.SaveChangesAsync() == 1){
                    return Created($"/api/tenis/{model.cod}",model);
                }
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao conectar no BD");
            }
            return BadRequest();
            
        }

        [HttpPut("{TenisCod}")]
        public ActionResult put(string TenisCod){
            return Ok();
        }

        [HttpDelete("{TenisCod}")]
        public ActionResult delete(string TenisCod){
            return Ok();
        }
    }
}