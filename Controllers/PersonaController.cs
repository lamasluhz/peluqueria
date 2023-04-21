using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Controllers;
using SampleMapper.Models.DTOs.Incoming;

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
        public async Task<ActionResult<PersonaCreationDto>> PostPersona(PersonaCreationDto persona)
        {
            ///persona
            var _persona = new Persona()
    {
       // persona DTO
        Nombres= persona.Nombres,
        Apellidos=persona.Apellidos,
        Correo=persona.Correo,
        Telefono=persona.Telefono,
        Direccion=persona.Direccion,
        Cedula=persona.Cedula,
        Eliminado= false
    };
            _context.Personas.Add(_persona);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetPersona", new { id = _persona.Id }, persona);
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
        public async Task<ActionResult<Persona>> DeletePersona(int id)
        {
            var persona = _context.Personas.FirstOrDefault(x => x.Id == id);

            if (persona == null)
                return NotFound();

            persona.Eliminado = true;
            await _context.SaveChangesAsync();

            return Ok(persona);
        }
    }
}