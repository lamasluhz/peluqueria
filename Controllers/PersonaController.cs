using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Controllers;

namespace PeluqueriaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonaController : ControllerBase
    {
        private readonly ILogger<PersonaController> _logger;
        //private static List<Persona> personas = new List<Persona>();
        private PeluqueriaContext _context;
        public PersonaController(ILogger<PersonaController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get(){
            var Result = await _context.Personas.ToListAsync();
            return Ok(Result); 
        }

        [HttpPost]
        public IActionResult PostPersona(Persona persona){
            if(ModelState.IsValid){
                _context.Add(persona);
                return CreatedAtAction("Get",routeValues:new{persona.Id},value:persona);

            }
            return new JsonResult("Ha ocurrido un error") {StatusCode = 500};
        }
        
        [HttpGet("{id}")]
        [Route("GetPersona")]
        public async Task<ActionResult> GetPersona(int id){
            var item = await _context.Personas.FirstOrDefaultAsync(x=> x.Id == id);

            if(item == null){
                return NotFound();  
            }
            return Ok(item); 
        }
    }
}