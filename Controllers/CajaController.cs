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
///////////////////////
[HttpPost("cajas")]
public IActionResult AgregarCaja([FromBody] CajaAgregarDto cajaAgregarDto)
{
    try
    {
        string claveEncriptada = HashPassword(cajaAgregarDto.Clave);
        
        // Crear una nueva instancia de Caja con los datos proporcionados
        var nuevaCaja = new Caja
        {
            Nombre = cajaAgregarDto.Nombre,
            Clave = claveEncriptada,
            HoraInicial = DateTime.Now.TimeOfDay,
            HoraFinal = DateTime.Now.TimeOfDay,
            FechaCierre = DateTime.Now,
            FechaApertura = DateTime.Now,
            MontoApertura = 0,
            MontoCierre= 0,
            Estado="Cerrado",
            Eliminado = false
        };

          // Agregar la nueva caja al contexto de la base de datos
        _context.Cajas.Add(nuevaCaja);
        _context.SaveChanges();

        return Ok(nuevaCaja.IdCaja); // Devolver el ID de la caja recién creada
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}
[HttpPost("VerificarUsuario")]
public async Task<ActionResult<CajaDto>> VerificarUsuario([FromBody] CajaUsuarioDto usuarioDto)
{
    try
    {
        if (usuarioDto.Clave == null)
        {
            return BadRequest();
        }
        
        var user = await _context.Cajas.FirstOrDefaultAsync(u => u.Nombre.Equals(usuarioDto.Nombre));
        if (user == null)
        {
            return NotFound();
        }

        string inputPassword = usuarioDto.Clave;
        string hashedPassword = user.Clave;

        bool passwordMatches = BCrypt.Net.BCrypt.Verify(inputPassword, hashedPassword);

        if (passwordMatches)
        {
            user.Estado = "Abierta";
            user.MontoApertura = usuarioDto.MontoApertura; // Agregar el nuevo monto
            await _context.SaveChangesAsync();

            return Ok(user.IdCaja); // Mensaje de caja abierta
        }
        else
        {
            return NotFound();
        }
    }
    catch (Exception e)
    {
        return BadRequest(e);
    }
}




//////////////

[HttpGet("cajas")]
public IActionResult ObtenerCajas()
{
    try
    {
        var cajas = _context.Cajas
            .Select(c => new CajaDto
            {
                Nombre = c.Nombre,
                FechaApertura = c.FechaApertura,
              //  HoraInicio =c.HoraInicial.ToString("hh\\:mm"),
                //Horafinal =c.HoraFinal.ToString("hh\\:mm"),
                Estado = c.Estado,
                MontoApertura=c.MontoApertura,
                  
               // Eliminado = c.Eliminado
            })
            .ToList();

        return Ok(cajas); // Respuesta exitosa con todas las cajas
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}
[HttpGet("cajas/{id}")]
public IActionResult ObtenerCajaPorId(int id)
{
    try
    {
        var caja = _context.Cajas
            .Where(c => c.IdCaja == id)
            .Select(c => new CajaDto
            {
                Nombre = c.Nombre,
                FechaApertura = c.FechaApertura,
                // HoraInicio =c.HoraInicial.ToString("hh\\:mm"),
                // Horafinal =c.HoraFinal.ToString("hh\\:mm"),
                Estado = c.Estado,
                MontoApertura = c.MontoApertura,
                // Eliminado = c.Eliminado
            })
            .FirstOrDefault();

        if (caja == null)
        {
            return NotFound(); // Caja no encontrada
        }

        return Ok(caja); // Respuesta exitosa con la caja encontrada
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}



    }
}
