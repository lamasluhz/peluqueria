using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models.DTOs.Outgoing;
namespace PeluqueriaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeluqueroController : Controller
    {
        private readonly ILogger<Peluquero> _logger;

        private PeluqueriaContext _context;

        public PeluqueroController(ILogger<Peluquero> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Peluquero>>> Get()
        {
            var Result = await _context.Peluqueros.ToListAsync();
            return Ok(Result);
        }

        [HttpGet("GetEspecialidadPorPeluquero/{id}")]
        public async Task<ActionResult<List<EspecialidadDto>>> GetEspecialidades(int id)
        {
            var detallesEspecialidades = await _context.DetallesEspecialidades.ToListAsync();
            var especilidades = await _context.Especialidades.ToListAsync();
            var peluqueros = await _context.Peluqueros.FindAsync(id);// trae la lista de peluqeros sql 

            if (peluqueros == null) return NotFound();

            var result = from dtesp in detallesEspecialidades
                         where peluqueros.Id == dtesp.IdPeluquero
                         join esp in especilidades
                         on dtesp.IdEspecialidad equals esp.Id
                         select new EspecialidadPeluqueroDto()
                         {
                             Especialidad = esp.Especialidad
                         };
            return result != null ? Ok(result.ToList()) : BadRequest("Error");
        }

        [HttpGet("GetPeluqueros/")]// traer peluqueros
        public async Task<ActionResult<PeluqueroDto>> GetAlter()
        {
            var peluqueros = await _context.Peluqueros.ToListAsync();// trae la lista de peluqeros sql 
            var detallesEspecialidades = await _context.DetallesEspecialidades.ToListAsync();
            var especilidades = await _context.Especialidades.ToListAsync();
            var personas = await _context.Personas.ToListAsync();
            try
            {
                var result = from p in peluqueros
                             join d in detallesEspecialidades
                             on p.Id equals d.IdPeluquero
                             join per in personas
                             on p.IdPersona equals per.Id
                             where p.Eliminado != true  //para traer peluquero no eliminados
                             group new { p, d, per } by p.Id into g
                             select new PeluqueroDto()
                             {
                                 Id = g.Key,
                                 Nombres = g.First().per.Nombres,
                                 Apellidos = g.First().per.Apellidos,
                                 Correo = g.First().per.Correo,
                                 Telefono = g.First().per.Telefono,
                                 Direccion = g.First().per.Direccion,
                                 Cedula = g.First().per.Cedula,
                                 Eliminado = g.First().per.Eliminado,
                                 ListEspecialidades = (from esp in especilidades
                                                       join det in detallesEspecialidades on esp.Id equals det.IdEspecialidad
                                                       where det.IdPeluquero == g.Key
                                                       select new EspecialidadDto()
                                                       {
                                                           Id = esp.Id,
                                                           Especialidad = esp.Especialidad,
                                                           Descripcion = esp.Descripcion,
                                                           Eliminado = esp.Eliminado != null ? esp.Eliminado : esp.Eliminado
                                                       }).ToList()

                             };
                return result != null ? Ok(result) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public async Task<ActionResult<PeluqueroDto>> Post(PeluqueroDto peluqueroDto)
        {
            var _persona = new Persona()
            {
                Nombres = peluqueroDto.Nombres,
                Apellidos = peluqueroDto.Apellidos,
                Cedula = peluqueroDto.Cedula,
                Correo = peluqueroDto.Correo,
                Telefono = peluqueroDto.Telefono,
                Direccion = peluqueroDto.Direccion,
                Eliminado = false
            };
            _context.Personas.Add(_persona);
            _context.SaveChanges();

            var _peluqueros = new Peluquero()
            {
                IdPersona = _persona.Id,
                Eliminado = false
            };
            _context.Peluqueros.Add(_peluqueros);
            _context.SaveChanges();

            List<EspecialidadDto>? listEspecialidades = peluqueroDto.ListEspecialidades;
            listEspecialidades.ForEach(dto =>
            {
                var _especialidad = new Especialidade()
                {
                    Especialidad = dto.Especialidad,
                    Descripcion = dto.Descripcion,
                    Eliminado = false,
                };
                _context.Especialidades.Add(_especialidad);
                _context.SaveChanges();
                var _detallesEspecialidad = new DetallesEspecialidade()
                {
                    IdPeluquero = _peluqueros.Id,
                    IdEspecialidad = _especialidad.Id,
                    Eliminado = false
                };

                _context.DetallesEspecialidades.Add(_detallesEspecialidad);
                _context.SaveChanges();
            });

            await _context.SaveChangesAsync();
            return new CreatedAtRouteResult("GetPeluquero", new { id = _peluqueros.Id }, peluqueroDto);
        }

        [HttpGet("{id}", Name = "GetPeluquero")]
         public async Task<ActionResult<Peluquero>> GetById(int id)
        {
            var peluquero = await _context.Peluqueros.FindAsync(id);

            if (peluquero == null) NotFound();

            return peluquero;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Peluquero>> Put(int id, PersonaDto peluqueroDto)
        {
            if (id == peluqueroDto.Id) return BadRequest();
            var peluquero = await _context.Peluqueros.FindAsync(id);
            if(peluquero == null) return NotFound();

            var persona = await _context.Personas.FirstOrDefaultAsync(a=> a.Id == peluquero.IdPersona);
            persona.Nombres = peluqueroDto.Nombres;
            persona.Apellidos = peluqueroDto.Apellidos;
            persona.Cedula = peluqueroDto.Cedula;
            persona.Correo = peluqueroDto.Correo;
            persona.Direccion = peluqueroDto.Direccion;
            persona.Telefono = peluqueroDto.Telefono;       
            await _context.SaveChangesAsync();

            return Ok(peluquero);
        }

        [HttpPut("UpdatePeluquero/{id}")]
        public async Task<ActionResult<PeluqueroDto>> UpdatePeluquero(int id, PeluqueroDto peluqueroDto)
        {
            if (id != peluqueroDto.Id) return BadRequest();
            var peluquero = await _context.Peluqueros.FindAsync(id);
            if(peluquero == null) return NotFound();

            var persona = await _context.Personas.FirstOrDefaultAsync(a=> a.Id == peluquero.IdPersona);
            persona.Nombres = peluqueroDto.Nombres;
            persona.Apellidos = peluqueroDto.Apellidos;
            persona.Cedula = peluqueroDto.Cedula;
            persona.Correo = peluqueroDto.Correo;
            persona.Direccion = peluqueroDto.Direccion;
            persona.Telefono = peluqueroDto.Telefono;       
            await _context.SaveChangesAsync();

            foreach(var esp in peluqueroDto.ListEspecialidades){
               var especilidad = await _context.Especialidades.FirstOrDefaultAsync(a=> a.Id == esp.Id);        
               especilidad.Descripcion = esp.Descripcion;
               especilidad.Especialidad = esp.Especialidad;
               await _context.SaveChangesAsync();
            }

            return Ok(peluqueroDto);
        }        

        [HttpDelete("{id}")]
        public async Task<ActionResult<Peluquero>> Delete(int id)
        {
            var peluquero = _context.Peluqueros.FirstOrDefault(x => x.Id == id);

            if (peluquero == null)
                return NotFound();

            peluquero.Eliminado = true;
            await _context.SaveChangesAsync();

            var persona = await _context.Personas.FindAsync(peluquero.IdPersona);
            persona.Eliminado = true;
            await _context.SaveChangesAsync();


            return Ok(peluquero);
        }
    }
}