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
        public ActionResult Get()
        {
            //var Result = await _context.Peluqueros.ToListAsync();
            //return Ok(Result);
            List<Peluquero> ListPeluquero = _context.Peluqueros.ToList();
            List<PeluqueroDto> ListpeluqueroDtos = new List<PeluqueroDto>();
            for (int i = 0; i < ListPeluquero.Count() - 1; i++)
            {
                ListpeluqueroDtos.Add(ConvertToDto(ListPeluquero[i]));
            }
            var Result = ListpeluqueroDtos.ToList();

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
            {//
                var result = from p in peluqueros
                             join d in detallesEspecialidades///
                             on p.Id equals d.IdPeluquero
                             join per in personas////
                             on p.IdPersona equals per.Id
                             select new PeluqueroDto()
                             {
                                 Id = p.Id,
                                 Nombres = per.Nombres,
                                 Apellidos = per.Apellidos,
                                 Correo = per.Correo,
                                 Telefono = per.Telefono,
                                 Direccion = per.Direccion,
                                 Cedula = per.Cedula,
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

        private List<PeluqueroDto> convert2DtoPeluquero(List<Peluquero> peluqueros)
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
                        Eliminado = true//b.IdEspecialidadNavigation.Eliminado.Value
                    }
                    ).ToList()
                }).ToList();
            }
            return new List<PeluqueroDto> { };
        }

        [HttpPost]
        public async Task<ActionResult<PeluqueroCreationDto>> Post(PeluqueroCreationDto peluqueroDto)
        {
            var _peluquero = new Peluquero()
            {
                IdPersona = peluqueroDto.IdPersona,
                Eliminado = false
            };
            _context.Peluqueros.Add(_peluquero);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetPeluquero", new { id = _peluquero.Id }, peluqueroDto);
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

        /*[HttpGet("peluquero/{id}", Name = "GetPeluqueros")]
        public async Task<ActionResult<PeluqueroDto>> GetPeluqueros(int id)
        {
            Persona persona = new Persona();
            DetallesEspecialidade detallesEspecialidade = new DetallesEspecialidade();
            Especialidade especialidade = new Especialidade();

            var _peluquero = _context.Peluqueros.FirstOrDefault(x => x.Id == id);

            var _persona = _context.Personas.FirstOrDefault(x => x.Id == _peluquero.IdPersona);

            var _especialidadDetalle = _context.DetallesEspecialidades.FirstOrDefault(x => x.IdPeluquero == _peluquero.Id);

            var _especialidades = _context.Especialidades.FirstOrDefault(x => x.Id == _especialidadDetalle.IdEspecialidad);


            PeluqueroDto peluqueroDto = new PeluqueroDto(){
                Nombres = _persona.Nombres,
                Apellidos = _persona.Apellidos,

            }


            if (peluquero == null)
            {
                return NotFound();
            }
            return peluquero;
        }*/

        private PeluqueroDto ConvertToDto(Peluquero peluquero)
        {
            PeluqueroDto peluqueroDto = new PeluqueroDto();
            peluqueroDto.Id = peluquero.Id;
            peluqueroDto.Eliminado = peluquero.Eliminado;

            var persona = _context.Personas.FirstOrDefault(x => x.Id == peluquero.IdPersona);
            peluqueroDto.Nombres = persona.Nombres;
            peluqueroDto.Apellidos = persona.Apellidos;
            peluqueroDto.Cedula = persona.Cedula;
            peluqueroDto.Telefono = persona.Telefono;
            peluqueroDto.Correo = persona.Correo;
            peluqueroDto.Direccion = persona.Direccion;

            var detallesEspecialidade = _context.DetallesEspecialidades.FirstOrDefault(x => x.IdPeluquero == peluquero.Id);
            List<Especialidade>? ListEspecialidades = new List<Especialidade>();
            //peluqueroDto.ListEspecialidadesDto = new List<EspecialidadDto>();
            //peluqueroDto.ListEspecialidades = _context.Especialidades.Where(x => x.Id == detallesEspecialidade.IdEspecialidad).ToList();

            //for (int i = 0; i < ListEspecialidades.Count(); i++)
            /// {
            //peluqueroDto.ListEspecialidades.Add(ListEspecialidades);
            //peluqueroDto.ListEspecialidadesDto[i].Descripcion = ListEspecialidades[i].Descripcion;

            //Console.Write( ListEspecialidades[i].Especialidad + "\n" + ListEspecialidades[i].Descripcion + "\n");
            // }
            return peluqueroDto;

        }

    }
}