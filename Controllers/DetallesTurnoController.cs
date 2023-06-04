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



    [HttpGet]//  get generalizado de detalles turnos 
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
            .Select(ts => ts.Descripcion)
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


// post de turno y detalle turno donde añadimos mas de un servicio en diferentes detelles para el mismo turno 

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
        IdCliente = dto.IdCliente,
        HoraInicio = TimeSpan.Parse(dto.HoraInicio),
        HoraFinalizacion = TimeSpan.Parse(dto.HoraFinalizacion),
        Eliminado = dto.Eliminado.GetValueOrDefault(false), // Obtener el valor de Eliminado o usar false si es nulo
        Estado = "pendiente"
    };

    // Guardar el objeto Turno en la base de datos
    _context.Turnos.Add(turno);
    _context.SaveChanges();

 // Calcular la suma del DecMonto de los servicios
    decimal sumaDecMonto = (decimal)_context.TiposServicios
        .Where(ts => dto.IdsTipoServicio.Contains(ts.Id))
        .Sum(ts => ts.DecMonto);

    // Recorrer la lista de tipos de servicio y crear un objeto DetallesTurno para cada uno
    foreach (int idTipoServicio in dto.IdsTipoServicio)
    {
        var detallesTurno = new DetallesTurno
        {
            IdTurno = turno.Id,
            IdTipoServicio = idTipoServicio,
            IdPeluquero = dto.IdPeluquero,
            DecMonto = sumaDecMonto,
            Fecha = dto.Fecha,
            Eliminado = false
        };

        // Guardar el objeto DetallesTurno en la base de datos
        _context.DetallesTurnos.Add(detallesTurno);
        _context.SaveChanges();
    }

    // Devolver una respuesta de éxito
    return Ok();
}


//listado por id de turno 
[HttpGet("GetDetallesTurnoGeneral/{id}")]
public async Task<ActionResult<DetallesTurnoResponseDto>> GetDetallesTurno(int id)
{
    var turno = await _context.Turnos
        .Include(t => t.DetallesTurnos)
            .ThenInclude(dt => dt.IdTipoServicioNavigation)
        .Include(t => t.IdClienteNavigation)
        .Include(t => t.DetallesTurnos)
            .ThenInclude(dt => dt.IdPeluqueroNavigation)
        .FirstOrDefaultAsync(t => t.Id == id);

    if (turno == null)
        return NotFound();

    var servicios = turno.DetallesTurnos.Select(dt => new ServicioDto
    {
        Id = dt.IdTipoServicioNavigation.Id,
        TipoServicio = dt.IdTipoServicioNavigation.Descripcion,
        Monto = dt.DecMonto ?? 0
    }).ToList();

    var montoTotal = servicios.Sum(s => s.Monto);

var detallesTurnoResponse = new DetallesTurnoResponseDto
{
    Id = turno.Id,
    Cliente = _context.Turnos
        .Where(t => t.Id == turno.Id)
        .Join(_context.Clientes,
            t => t.IdCliente,
            c => c.IdPersona,
            (t, c) => c)
        .Join(_context.Personas,
            c => c.IdPersona,
            p => p.Id,
            (c, p) => $"{p.Nombres} {p.Apellidos}")
        .FirstOrDefault(),
    Peluquero = _context.Peluqueros
        .Where(p => p.Id == turno.DetallesTurnos.First().IdPeluquero)
        .Join(_context.Personas,
            p => p.IdPersona,
            pe => pe.Id,
            (p, pe) => new { p, pe })
        .Select(x => $"{x.pe.Nombres} {x.pe.Apellidos}")
        .FirstOrDefault(),
    Servicios = servicios,
    MontoTotal = montoTotal,
    Fecha = turno.Fecha, // Agrega la propiedad Fecha
    HoraInicio = _context.Turnos
        .Where(t => t.Id == turno.Id)
        .Select(t => t.HoraInicio)
        .FirstOrDefault(), // Agrega la propiedad HoraInicio
    HoraFinalizacion = _context.Turnos
        .Where(t => t.Id == turno.Id)
        .Select(t => t.HoraFinalizacion)
        .FirstOrDefault() // Agrega la propiedad HoraFinalizacion
};





    return detallesTurnoResponse;
}


// Edit 
[HttpPut("ActualizarDetallesTurno/{id}")]
public async Task<IActionResult> ActualizarDetallesTurno(int id, DetallesTurnoUpdateDto detallesTurnoDto)
{
    var turno = await _context.Turnos
        .Include(t => t.DetallesTurnos)
        .FirstOrDefaultAsync(t => t.Id == id);

    if (turno == null)
        return NotFound();

    // Actualizar los datos del turno con los valores del DTO
    turno.HoraInicio = detallesTurnoDto.HoraInicio;
    turno.HoraFinalizacion = detallesTurnoDto.HoraFinalizacion;
    turno.Estado=detallesTurnoDto.Estado;

    // Actualizar los servicios
    foreach (var servicioDto in detallesTurnoDto.Servicios)
    {
        var servicio = turno.DetallesTurnos.FirstOrDefault(dt => dt.IdTipoServicio == servicioDto.Id);
        if (servicio != null)
        {
            servicio.DecMonto = servicioDto.Monto;
            // Actualizar otras propiedades del servicio si es necesario
        }
    }

    // Guardar los cambios en la base de datos
    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        // Manejar excepciones de concurrencia si es necesario
        throw;
    }

    // Mapear el resultado a un DetallesTurnoResponseDto para devolver en la respuesta
    var detallesTurnoResponse = new DetallesTurnoResponseDto
    {
        Id = turno.Id,
        Cliente = _context.Turnos
            .Where(t => t.Id == turno.Id)
            .Join(_context.Clientes,
                t => t.IdCliente,
                c => c.IdPersona,
                (t, c) => c)
            .Join(_context.Personas,
                c => c.IdPersona,
                p => p.Id,
                (c, p) => $"{p.Nombres} {p.Apellidos}")
            .FirstOrDefault(),
        Peluquero = _context.Peluqueros
            .Where(p => p.Id == turno.DetallesTurnos.First().IdPeluquero)
            .Join(_context.Personas,
                p => p.IdPersona,
                pe => pe.Id,
                (p, pe) => new { p, pe })
            .Select(x => $"{x.pe.Nombres} {x.pe.Apellidos}")
            .FirstOrDefault(),
        Servicios = turno.DetallesTurnos.Select(dt => new ServicioDto
        {
            Id = dt.IdTipoServicioNavigation.Id,
            TipoServicio = dt.IdTipoServicioNavigation.Tipo,
            Monto = dt.DecMonto ?? 0
        }).ToList(),
        MontoTotal = turno.DetallesTurnos.Sum(dt => dt.DecMonto ?? 0),
        Fecha = turno.Fecha,
        HoraInicio = turno.HoraInicio,
        HoraFinalizacion = turno.HoraFinalizacion,
        Estado = turno.Estado
    };

    return Ok(detallesTurnoResponse);
}




//// detalles sin id filtrado por turno
[HttpGet("GetDetallesTurnoGeneral")]
public async Task<ActionResult<List<DetallesTurnoResponseDto>>> GetDetallesTurno()
{
    var turnos = await _context.Turnos
        .Include(t => t.DetallesTurnos)
            .ThenInclude(dt => dt.IdTipoServicioNavigation)
        .Include(t => t.IdClienteNavigation)
            .ThenInclude(c => c.IdPersonaNavigation) // Cargar la entidad Persona del Cliente
        .Include(t => t.DetallesTurnos)
            .ThenInclude(dt => dt.IdPeluqueroNavigation)
        .ToListAsync();

    var detallesTurnoResponses = new List<DetallesTurnoResponseDto>();

    foreach (var turno in turnos)
    {
        var servicios = turno.DetallesTurnos.Select(dt => new ServicioDto
        {
            Id = dt.IdTipoServicioNavigation.Id,
            TipoServicio = dt.IdTipoServicioNavigation.Tipo,
            Descripcion= dt.IdTipoServicioNavigation.Descripcion,
            Monto = dt.DecMonto ?? 0
        }).ToList();

        var montoTotal = servicios.Sum(s => s.Monto);

        var detallesTurnoResponse = new DetallesTurnoResponseDto
        {
            Id = turno.Id,
            Cliente = turno.IdClienteNavigation?.IdPersonaNavigation != null ? $"{turno.IdClienteNavigation.IdPersonaNavigation.Nombres} {turno.IdClienteNavigation.IdPersonaNavigation.Apellidos}" : string.Empty,
            Peluquero = turno.DetallesTurnos.Any()
                ? _context.Peluqueros
                    .Where(p => p.Id == turno.DetallesTurnos.First().IdPeluquero)
                    .Join(_context.Personas,
                        p => p.IdPersona,
                        pe => pe.Id,
                        (p, pe) => new { p, pe })
                    .Select(x => $"{x.pe.Nombres} {x.pe.Apellidos}")
                    .FirstOrDefault()
                : string.Empty,
            Servicios = servicios,
            MontoTotal = montoTotal,
            Fecha = turno.Fecha,
            HoraInicio = turno.HoraInicio,
            HoraFinalizacion = turno.HoraFinalizacion,
            Estado = turno.Estado
        };

        detallesTurnoResponses.Add(detallesTurnoResponse);
    }

    return detallesTurnoResponses;
}

/////
[HttpGet("GetDetallesTurnosFiltroMeses")]
public async Task<ActionResult<List<DetallesTurnoResponseDto>>> GetDetallesTurnoMeses(int mes)
{
    var turnos = await _context.Turnos
        .Include(t => t.DetallesTurnos)
            .ThenInclude(dt => dt.IdTipoServicioNavigation)
        .Include(t => t.IdClienteNavigation)
            .ThenInclude(c => c.IdPersonaNavigation) // Cargar la entidad Persona del Cliente
        .Include(t => t.DetallesTurnos)
            .ThenInclude(dt => dt.IdPeluqueroNavigation)
        .Where(t => t.Fecha.Month == mes) // Filtrar por mes
        .ToListAsync();

    var detallesTurnoResponses = new List<DetallesTurnoResponseDto>();

    foreach (var turno in turnos)
    {
        var servicios = turno.DetallesTurnos.Select(dt => new ServicioDto
        {
            Id = dt.IdTipoServicioNavigation.Id,
            TipoServicio = dt.IdTipoServicioNavigation.Tipo,
            Descripcion= dt.IdTipoServicioNavigation.Descripcion,
            Monto = dt.DecMonto ?? 0
        }).ToList();

        var montoTotal = servicios.Sum(s => s.Monto);

        var detallesTurnoResponse = new DetallesTurnoResponseDto
        {
            Id = turno.Id,
            Cliente = turno.IdClienteNavigation?.IdPersonaNavigation != null ? $"{turno.IdClienteNavigation.IdPersonaNavigation.Nombres} {turno.IdClienteNavigation.IdPersonaNavigation.Apellidos}" : string.Empty,
            Peluquero = turno.DetallesTurnos.Any()
                ? _context.Peluqueros
                    .Where(p => p.Id == turno.DetallesTurnos.First().IdPeluquero)
                    .Join(_context.Personas,
                        p => p.IdPersona,
                        pe => pe.Id,
                        (p, pe) => new { p, pe })
                    .Select(x => $"{x.pe.Nombres} {x.pe.Apellidos}")
                    .FirstOrDefault()
                : string.Empty,
            Servicios = servicios,
            MontoTotal = montoTotal,
            Fecha = turno.Fecha,
            HoraInicio = turno.HoraInicio,
            HoraFinalizacion = turno.HoraFinalizacion,
            Estado = turno.Estado
        };

        detallesTurnoResponses.Add(detallesTurnoResponse);
    }

    return detallesTurnoResponses;
}



    }
}