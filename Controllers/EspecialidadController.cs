using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using PeluqueriaWebApi.Models.DTOs.Outgoing;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models.DTOs.Outgoing;
using PeluqueriaWebApi.Models.DTOs.Incoming;

namespace PeluqueriaWebApi.Controllers
{
    [Route("api/[controller]")]
    public class EspecialidadController : Controller
    {
        private readonly ILogger<Especialidade> _logger;
        private PeluqueriaContext _context;

        public EspecialidadController(ILogger<Especialidade> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<EspecialidadDto>> GetEspecialidades()
        {
            var especialidades = await _context.Especialidades.ToListAsync();

            var result = (from esp in especialidades
                          select new EspecialidadDto()
                          {
                              Id = esp.Id,
                              Especialidad = esp.Descripcion,
                              Descripcion = esp.Descripcion,
                              Eliminado = esp.Eliminado
                          }).ToList();

            return result != null ? Ok(result) : BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<EspecialidadDto>> PostEspecialidad(EspecialidadCreationDto especialidadDto)
        {
            var _especialidad = new Especialidade()
            {
                Especialidad = especialidadDto.Especialidad,
                Descripcion = especialidadDto.Descripcion,
                Eliminado = false
            };
            _context.Especialidades.Add(_especialidad);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetEspecialidad", new { id = _especialidad.Id }, especialidadDto);
        }

        [HttpGet("{id}", Name = "GetEspecialidad")]
        public async Task<ActionResult<EspecialidadDto>> GetById(int id)
        {
            var especialidad = await _context.Especialidades.FindAsync(id);

            if (especialidad == null) return NotFound();


            var result = new EspecialidadDto()
            {
                Id = especialidad.Id,
                Especialidad = especialidad.Descripcion,
                Descripcion = especialidad.Descripcion,
                Eliminado = especialidad.Eliminado
            };

            return result != null ? Ok(result) : BadRequest("Error");
        }
    }
}