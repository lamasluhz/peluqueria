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
        
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetPersona(int id){
            var item = _context.Personas.FirstOrDefaultAsync(x=> x.Id == id);

            if(item == null){
                return NotFound();  
            }
            return Ok(item); 
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePersona(int id, Persona persona){
            if (id == persona.Id) return BadRequest();

            var existingPersona = _context.Personas.FirstOrDefault(x => x.Id == persona.Id);
        
            if (existingPersona == null)
                return NotFound();

            existingPersona.Nombres = persona.Nombres;
            existingPersona.Apellidos = persona.Apellidos;
            existingPersona.Cedula = persona.Cedula;
            existingPersona.Correo = persona.Correo;
            existingPersona.Direccion = persona.Direccion;
            existingPersona.Telefono = persona.Telefono;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePersona(int id){
            var existingPersona = _context.Personas.FirstOrDefault(x=> x.Id == id);

            if(existingPersona == null)
                return NotFound();

            existingPersona.Eliminado = true;

            return NoContent();   
        }
    }
}