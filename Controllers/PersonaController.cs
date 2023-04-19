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
        private PeluqueriaContext DbPeluqueria;
        public PersonaController(PeluqueriaContext context)
        {
            DbPeluqueria = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get(){
            var Result = await DbPeluqueria.Personas.ToListAsync();
            return Ok(Result); 
        }

        [HttpPost]
        public IActionResult PostPersona(Persona persona){
            if(ModelState.IsValid){
                DbPeluqueria.Add(persona);
                return CreatedAtAction("Get",routeValues:new{persona.Id},value:persona);

            }
            return new JsonResult("Ha ocurrido un error") {StatusCode = 500};
        }
        
        [HttpGet("{id}")]
        [Route("GetPersona")]
        public IActionResult GetPersona(Guid id){
            var item = DbPeluqueria.FirstOrDefault(x => x.Id == id);

            if(item == null){
                return NotFound();

             return Ok(item);   
            }
        }
    }
}