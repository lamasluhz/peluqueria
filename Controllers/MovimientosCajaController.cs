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
     
////////////
/*
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
                IdFactura = null,
                IdFacturaProveedor = null,
                FechaMovimiento = DateTime.Now,
                Eliminado = false
            };

            _context.MovimientosCaja.Add(nuevoMovimiento);
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

            _context.MovimientosCaja.Add(nuevoMovimiento);
            _context.SaveChanges();

            return Ok(nuevoMovimiento.IdMovimiento);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
        }
*/

    }
}
