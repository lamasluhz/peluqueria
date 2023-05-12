using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Controllers;
using PeluqueriaWebApi.Models.DTOs.Outgoing;

namespace PeluqueriaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class  TiposServiciosController : ControllerBase
    {
        private readonly ILogger<TipoServicio> _logger;
        private PeluqueriaContext _context;
        public TiposServiciosController(ILogger<TipoServicio> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }
         [HttpGet]
        public async Task<ActionResult<List<TipoServicio>>> Get()
        {
            var Result = await _context.TiposServicios.ToListAsync();
            return Ok(Result);
        }

        [HttpGet("getServicios/")]// traer Servicios
        public async Task<ActionResult<List<TipoServicioDto>>> GetAlter()
        {
            var servicios = await _context.TiposServicios.ToListAsync();// trae la lista de servicios sql 
           
            try
            {
                var result = from cl in servicios
                             
                             select new TipoServicioDto()
                             {
                                 Id = cl.Id,
                                 Tipo = cl.Tipo,
                                 Descripcion=cl.Descripcion,
                                DecMonto=cl.DecMonto,
                                 Eliminado = cl.Eliminado

                             };

                return result != null ? Ok(result.ToList()) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
     }
     /*
[HttpGet("{tipo}", Name = "GetTipo")]
public async Task<ActionResult<TipoServicio>> GetTipo(string tipo)
{
    var tipoServicio = await _context.TipoServicios.FirstOrDefaultAsync(ts => ts.Tipo == tipo);

    if (tipoServicio == null)
    {
        return NotFound();
    }

    return Ok(tipoServicio);
}*/

[HttpGet("{tipo}", Name = "GetTipo")]
 public async Task<ActionResult<IEnumerable<TipoServicio>>> GetTipo(string tipo)
{
    var tipoServicios = await _context.TiposServicios.Where(ts => ts.Tipo == tipo).ToListAsync();

    if (tipoServicios == null)
    {
        return NotFound();
    }

    return Ok(tipoServicios);
}
    }
}