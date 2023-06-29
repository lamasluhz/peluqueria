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
    public class CajaController : Controller
    {
        private readonly ILogger<Caja> _logger;
        private PeluqueriaContext _context;
        public CajaController(ILogger<Caja> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        ////////////


        private string HashPassword(string password)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return hashedPassword;
        }

///nuevo 
 [HttpPost("cajas")]
        public IActionResult AbrirCaja(CajaAgregarDto cajaAperturaDto)
        {
            try
            {
                var nuevaCaja = new Caja
                {
                    FechaApertura = DateTime.Now,
                    HoraInicial = DateTime.Now.TimeOfDay,
                    MontoApertura = cajaAperturaDto.MontoInicial,
                    Nombre = "Caja",
                    Estado = "Abierta",
                    Eliminado = false
                };

                _context.Cajas.Add(nuevaCaja);
                _context.SaveChanges();

                return Ok(nuevaCaja.IdCaja);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al abrir la caja");
                return StatusCode(500, "Error al abrir la caja");
            }
        }






[HttpGet("cajas/{id}")]
public IActionResult ObtenerDetallesCaja(int id)
{
    try
    {
        var caja = _context.Cajas
            .FirstOrDefault(c => c.IdCaja == id);

        if (caja == null)
        {
            return NotFound(); // Caja no encontrada
        }

        var detallesCaja = new CajaDto
        {
            IdCaja = caja.IdCaja,
            FechaApertura = caja.FechaApertura.ToString("dd/MM/yyyy"),
            FechaCierre = caja.FechaCierre?.ToString("dd/MM/yyyy"),
           HoraInicio = caja.HoraInicial?.ToString(@"hh\:mm"),
            HoraFin = caja.HoraFinal?.ToString(@"hh\:mm"),
            MontoApertura = caja.MontoApertura,
            MontoCierre = caja.MontoCierre,
            Nombre = caja.Nombre,
            Estado = caja.Estado,
            Eliminado = caja.Eliminado
        };

        return Ok(detallesCaja); // Respuesta exitosa con los detalles de la caja
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}

[HttpPut("cajas/{id}/cerrar")]
public async Task<IActionResult> CerrarCaja(int id, CierreCajaDto cierreCajaDto)
{
    try
    {
        var caja = await _context.Cajas.FindAsync(id);
        if (caja == null)
        {
            return NotFound(); // Caja no encontrada
        }

        caja.MontoCierre = cierreCajaDto.MontoCierre;
        caja.HoraFinal = DateTime.Now.TimeOfDay;
        caja.FechaCierre = DateTime.Now;
        caja.Estado="Cerrado";

        await _context.SaveChangesAsync();

        return Ok(); // Respuesta exitosa
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}

        // guardar cierre tabla de caja trae total fecha y datos de hora







    }
}
