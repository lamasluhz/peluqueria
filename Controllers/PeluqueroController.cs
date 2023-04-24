using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using SampleMapper.Models.DTOs.Incoming;
using PeluqueriaWebApi.Models.DTOs.Incoming;
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

        [HttpGet("getPeluqueros/")]// traer peluqueros
        public async Task<ActionResult<List<PeluqueroDto>>> GetAlter()
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
                             //where p.Eliminado != true  para traer peluquero no eliminados
                             select new PeluqueroDto()
                             {
                                 Id = p.Id,
                                 Nombres = per.Nombres,
                                 Apellidos = per.Apellidos,
                                 Correo = per.Correo,
                                 Telefono = per.Telefono,
                                 Direccion = per.Direccion,
                                 Cedula = per.Cedula,
                                 Eliminado = per.Eliminado,
                                 ListEspecialidades = (from esp in especilidades
                                                       where esp.Id == d.IdEspecialidad
                                                       select new EspecialidadDto()
                                                       {
                                                           Id = esp.Id,
                                                           Especialidad = esp.Especialidad,
                                                           Descripcion = esp.Descripcion,
                                                           Eliminado = esp.Eliminado != null ? esp.Eliminado : esp.Eliminado
                                                       }).ToList()

                             };

                return result != null ? Ok(result.ToList()) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        private List<PeluqueroDto> convertDtoPeluquero(List<Peluquero> peluqueros)
        {
            if (peluqueros != null)
            {
                return peluqueros.Select(a => new PeluqueroDto()
                {
                    Id = a.Id,
                    Nombres = a.IdPersonaNavigation.Nombres,
                    Apellidos = a.IdPersonaNavigation.Apellidos,
                    Direccion = a.IdPersonaNavigation.Direccion,
                    Telefono = a.IdPersonaNavigation.Telefono,
                    Correo = a.IdPersonaNavigation.Correo,
                    Eliminado = a.Eliminado,
                    ListEspecialidades = a.DetallesEspecialidades.Select(b => new EspecialidadDto()
                    {
                        Id = b.Id,
                        Especialidad = b.IdEspecialidadNavigation.Especialidad,
                        Descripcion = b.IdEspecialidadNavigation.Descripcion,
                        Eliminado = false
                    }
                    ).ToList()
                }).ToList();
            }
            return new List<PeluqueroDto> { };
        }

        [HttpPost]
        public async Task<ActionResult<PeluqueroCreationDto>> Post(PeluqueroDto peluqueroDto)
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
                    IdEspecialidad = _especialidad.Id
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

            if (peluquero == null)
            {
                return NotFound();
            }
            return peluquero;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Persona>> Update(int id, Peluquero peluquero)
        {
            if (id != peluquero.Id) return BadRequest();

            _context.Entry(peluquero).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(peluquero);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Persona>> Delete(int id)
        {
            var peluquero = _context.Personas.FirstOrDefault(x => x.Id == id);

            if (peluquero == null)
                return NotFound();

            peluquero.Eliminado = true;
            await _context.SaveChangesAsync();

            return Ok(peluquero);
        }
    }
}