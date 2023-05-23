using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models.DTOs.Incoming;
using PeluqueriaWebApi.Models.DTOs.Outgoing;


namespace PeluqueriaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetallesTurnoController : Controller
    {
        private readonly ILogger<DetallesTurno> _logger;

        private PeluqueriaContext _context;

        public DetallesTurnoController(ILogger<DetallesTurno> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        /*  [HttpGet]
          public async Task<ActionResult<List<DetallesTurno>>> Get()
          {
              var Result = await _context.Clientes.ToListAsync();
              return Ok(Result);
          }*/



    [HttpGet]
public async Task<ActionResult<List<DetallesTurnoDto>>> Get()
{
    var detallesTurno = await _context.DetallesTurnos.ToListAsync();

    var result = detallesTurno.Select(dt => new DetallesTurnoDto
    {
        Id = dt.Id,
        IdTurno = dt.IdTurno,
        IdTipoServicio = dt.IdTipoServicio,
        IdPeluquero = dt.IdPeluquero,
        Fecha = dt.Fecha,
        DecMonto = dt.DecMonto,
        Eliminado = dt.Eliminado,
        HoraInicio = _context.Turnos
            .Where(t => t.Id == dt.IdTurno)
            .Select(t => t.HoraInicio)
            .FirstOrDefault(),
        HoraFinalizacion = _context.Turnos
            .Where(t => t.Id == dt.IdTurno)
            .Select(t => t.HoraFinalizacion)
            .FirstOrDefault(),
        TipoServicio = _context.TiposServicios
            .Where(ts => ts.Id == dt.IdTipoServicio)
            .Select(ts => ts.Tipo)
            .FirstOrDefault(),
        ClienteNombre = _context.Turnos
            .Where(t => t.Id == dt.IdTurno)
            .Join(_context.Clientes,
                t => t.IdCliente,
                c => c.IdPersona,
                (t, c) => c)
            .Join(_context.Personas,
                c => c.IdPersona,
                p => p.Id,
                (c, p) => $"{p.Nombres} {p.Apellidos}")
            .FirstOrDefault(),
        PeluqueroNombre = _context.Peluqueros
            .Where(p => p.Id == dt.IdPeluquero)
            .Join(_context.Personas,
                p => p.IdPersona,
                pe => pe.Id,
                (p, pe) => new { p, pe })
            .Select(x => $"{x.pe.Nombres} {x.pe.Apellidos}")
            .FirstOrDefault(),
        CostoServicio = _context.TiposServicios
            .Where(ts => ts.Id == dt.IdTipoServicio)
            .Select(ts => ts.DecMonto)
            .FirstOrDefault()
    }).ToList();

    return Ok(result);
}







//////////////////////////////////////////////////////////////
[HttpPost]
public IActionResult Create(DetallesCreateTurnoDto dto)
{
    // Verificar si los datos recibidos son válidos
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Crear un nuevo objeto Turno y asignar los valores del DTO
    var turno = new Turno
    {
        Fecha = dto.Fecha.GetValueOrDefault(DateTime.Now), // Obtener el valor de Fecha o usar la fecha actual si es nulo
        IdCliente=dto.IdCliente,
        HoraInicio = TimeSpan.Parse(dto.horaInicio),
        HoraFinalizacion = TimeSpan.Parse(dto.horaFinalizacion),
         Eliminado = dto.Eliminado.GetValueOrDefault(false) // Obtener el valor de Eliminado o usar false si es nulo
    };

    // Crear un nuevo objeto DetallesTurno y asignar los valores del DTO
    var detallesTurno = new DetallesTurno
    {
        IdTurno = turno.Id,
        IdTipoServicio = dto.IdTipoServicio,
        IdPeluquero = dto.IdPeluquero,
        DecMonto = dto.DecMonto,
        Fecha = dto.Fecha,
        Eliminado = dto.Eliminado
    };

    // Guardar los objetos en la base de datos
    // (Aquí debes utilizar tu contexto de base de datos y guardar los objetos según tu implementación)

     _context.Turnos.Add(turno);
    _context.SaveChangesAsync();
     _context.DetallesTurnos.Add(detallesTurno);
     _context.SaveChangesAsync();

    // Devolver una respuesta de éxito
    return Ok();
}

    }
}