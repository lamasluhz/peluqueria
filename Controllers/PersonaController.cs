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
        public async Task<ActionResult> Get()
        {
            var Result = await _context.Personas.ToListAsync();
            return Ok(Result);
        }

        [HttpPost]
        public IActionResult PostPersona(Persona persona)
        {
            if (ModelState.IsValid)
            {
                _context.Personas.Add(persona);
                //await _context.SaveChangesAsync();
                return CreatedAtAction("Get", routeValues: new { persona.Id }, value: persona);
                //return new CreatedAtRouteResult("GetPersona", new {id =  persona.Id }, persona);

            }
            return new JsonResult("Ha ocurrido un error") { StatusCode = 500 };
        }

        [HttpGet("{id}", Name = "GetPersona")]
        public async Task<ActionResult<Persona>> GetPersona(int id)
        {
            var persona = await _context.Personas.FindAsync(id);

            if (persona == null)
            {
                return NotFound();
            }
            return persona;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Persona>> UpdatePersona(int id, Persona persona)
        {
            if (id != persona.Id) return BadRequest();

            _context.Entry(persona).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(persona);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePersona(int id)
        {
            var existingPersona = _context.Personas.FirstOrDefault(x => x.Id == id);

            if (existingPersona == null)
                return NotFound();

            existingPersona.Eliminado = true;

            return NoContent();
        }
    }
}