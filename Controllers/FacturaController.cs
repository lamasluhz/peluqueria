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
    public class FacturaController : Controller
    {
        private readonly ILogger<Factura> _logger;
        private PeluqueriaContext _context;
        public FacturaController(ILogger<Factura> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }
     
/////
[HttpGet("GetFacturas")]
public async Task<ActionResult<List<FacturaDto>>> GetFacturas()
{
    var facturas = await _context.Facturas
        .Include(f => f.IdVentaNavigation)
            .ThenInclude(v => v.IdClienteNavigation)
                .ThenInclude(c => c.IdPersonaNavigation)
        .Include(f => f.IdVentaNavigation.VentasDetalles)
            .ThenInclude(d => d.IdProductoNavigation)
        .ToListAsync();

    var facturaDtos = facturas.Select(factura => new FacturaDto
    {
        NombreCliente = factura.IdVentaNavigation.IdClienteNavigation.IdPersonaNavigation.Nombres,
        ApellidoCliente = factura.IdVentaNavigation.IdClienteNavigation.IdPersonaNavigation.Apellidos,
        FechaFactura = factura.FechaEmision,
        Estado = factura.Estado,
        TotalVenta = factura.IdVentaNavigation.VentasDetalles.Sum(d => d.SubTotal)
    }).ToList();


    return facturaDtos;
}

        // DELETE: api/Factura/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFactura(int id)
        {
            // Buscar la factura por su ID
            var factura = await _context.Facturas.FindAsync(id);

            if (factura == null)
            {
                return NotFound();
            }

            // Cambiar el estado de eliminado a true
            factura.Eliminado = true;

            // Guardar los cambios en la base de datos
            await _context.SaveChangesAsync();

            return NoContent();
        }



    }
}
