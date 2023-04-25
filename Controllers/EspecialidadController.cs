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
        public async Task<ActionResult<Especialidade>> Get(){
            var especialidades = await _context.Especialidades.ToListAsync();

            
            return especialidades != null ? Ok(especialidades) : BadRequest("Error");
        }

        [HttpGet ("getEspecialidades/")]
        public async Task<ActionResult<List<EspecialidadDto>>> GetEspecialidades()
        {
            var especialidades = await _context.Especialidades.ToListAsync();

            var result = (from esp in especialidades
                         select new EspecialidadDto(){
                            Id = esp.Id,
                            Especialidad = esp.Descripcion,
                            Descripcion = esp.Descripcion,
                            Eliminado = esp.Eliminado
                         }).ToList();

            return result != null ? Ok(result.ToList()) : BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<Especialidade>> Post(EspecialidadDto especialidadDto){
            var _especialidad = new Especialidade(){
                Id = especialidadDto.Id,
                Especialidad = especialidadDto.Especialidad,
                Descripcion = especialidadDto.Descripcion,
                Eliminado = false
            };
                _context.Especialidades.Add(_especialidad);
                await _context.SaveChangesAsync();

                return new CreatedAtRouteResult("GetEspecialidad", new {id = _especialidad.Id}, especialidadDto);
        }
    } 
}