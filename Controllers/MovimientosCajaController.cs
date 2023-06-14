using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using PeluqueriaWebApi.Models.DTOs.Outgoing;

namespace PeluqueriaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimientosCajaController : Controller
    {
        private readonly ILogger<MovimientosCaja> _logger;
        private PeluqueriaContext _context;
        public MovimientosCajaController(ILogger<MovimientosCaja> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }
     
        // POST: api/MovimientosCaja/entrada
        [HttpPost("entrada")]
        public IActionResult AgregarMovimientoEntrada([FromBody] MovimientoEntradaDto movimientoEntradaDto)
        {
            try
            {
                var nuevoMovimiento = new MovimientosCaja
                {
                    IdCaja = movimientoEntradaDto.IdCaja,
                    TipoMovimiento = "Entrada",
                    Monto = movimientoEntradaDto.Monto,
                    IdFactura = movimientoEntradaDto.IdFactura,
                   IdFacturaProveedor = null,
                    FechaMovimiento = DateTime.Now,
                    Eliminado = false
                };

                _context.MovimientosCajas.Add(nuevoMovimiento);
                _context.SaveChanges();

                return Ok(nuevoMovimiento.IdMovimiento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
            }
        }

        // POST: api/MovimientosCaja/salida
        [HttpPost("salida")]
        public IActionResult AgregarMovimientoSalida([FromBody] MovimientoSalidaDto movimientoSalidaDto)
        {
            try
            {
                var nuevoMovimiento = new MovimientosCaja
                {
                    IdCaja = movimientoSalidaDto.IdCaja,
                    TipoMovimiento = "Salida",
                    Monto = movimientoSalidaDto.Monto,
                    IdFactura = null,
                    IdFacturaProveedor = movimientoSalidaDto.IdFacturaProveedor,
                    FechaMovimiento = DateTime.Now,
                    Eliminado = false
                };

                _context.MovimientosCajas.Add(nuevoMovimiento);
                _context.SaveChanges();

                return Ok(nuevoMovimiento.IdMovimiento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
            }
        }


// GET: api/MovimientosCaja/entrada/total?fecha=yyyy-MM-dd&idCaja=1
[HttpGet("entrada/totalSuma")]
public IActionResult ObtenerTotalMovimientosEntrada(DateTime fecha, int? idCaja)
{
    try
    {
        IQueryable<MovimientosCaja> query = _context.MovimientosCajas
            .Where(m => m.TipoMovimiento == "Entrada" && m.FechaMovimiento.Date == fecha.Date);

        if (idCaja.HasValue)
        {
            query = query.Where(m => m.IdCaja == idCaja);
        }

        decimal total = query.Sum(m => m.Monto);

        return Ok(total);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

// GET: api/MovimientosCaja/salida/total?fecha=yyyy-MM-dd&idCaja=1
[HttpGet("salida/totalSuma")]
public IActionResult ObtenerTotalMovimientosSalida(DateTime fecha, int? idCaja)
{
    try
    {
        IQueryable<MovimientosCaja> query = _context.MovimientosCajas
            .Where(m => m.TipoMovimiento == "Salida" && m.FechaMovimiento.Date == fecha.Date);

        if (idCaja.HasValue)
        {
            query = query.Where(m => m.IdCaja == idCaja);
        }

        decimal total = query.Sum(m => m.Monto);

        return Ok(total);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

// GET: api/MovimientosCaja
[HttpGet]
public IActionResult ObtenerTodosLosMovimientos()
{
    try
    {
        var movimientos = _context.MovimientosCajas.ToList();
        return Ok(movimientos);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

// GET: api/MovimientosCaja/fecha/{fecha}
[HttpGet("fecha/{fecha}")]
public IActionResult ObtenerMovimientosPorFecha(DateTime fecha)
{
    try
    {
        var movimientos = _context.MovimientosCajas
            .Where(m => m.FechaMovimiento.Date == fecha.Date)
            .ToList();

        return Ok(movimientos);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

    }
}
