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
     

[HttpGet("{id}", Name = "GetFactura")]
        public async Task<ActionResult<FacturaDto>> GetFactura(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);

            if (venta == null)
            {
                return NotFound();
            }

            var detallesVenta = await _context.VentasDetalles
                .Where(detalle => detalle.IdVenta == venta.Id)
                .Include(detalle => detalle.IdProductoNavigation)
                .ToListAsync();

            var productosServicios = detallesVenta.Select(detalle => new ProductoServicioDto
            {
                Id = detalle.IdProducto,
                Nombre = detalle.IdProductoNavigation?.Nombre,
                Cantidad = detalle.Cantidad,
                Subtotal = detalle.SubTotal
            }).ToList();

            var factura = new FacturaDto
            {
                IdVenta = venta.Id,
                FechaEmision = venta.Fecha,
                Total = venta.Total,
                ProductosServicios = productosServicios
            };

            return factura;
        }




/////verificar luego con ventas

[HttpPost]
public async Task<ActionResult<FacturaDto>> CreateFactura(FacturaDto facturaDto)
{
    // Crear una nueva instancia de Factura
    var factura = new Factura
    {
        IdVenta = facturaDto.IdVenta,
        IdMedioPago = facturaDto.IdMedioPago,
        FechaEmision = DateTime.Now,
        NumeroFactura = facturaDto.NumeroFactura,
        Eliminado = false
    };

    // Guardar la nueva factura en la base de datos
    _context.Facturas.Add(factura);
    await _context.SaveChangesAsync();

    // Crear el objeto FacturaDto de respuesta
    var facturaResponse = new FacturaDto
    {
        Id = factura.Id,
        IdVenta = factura.IdVenta,
        IdMedioPago = factura.IdMedioPago,
        FechaEmision = factura.FechaEmision,
        NumeroFactura = factura.NumeroFactura
    };

    return CreatedAtAction(nameof(GetFactura), new { id = factura.Id }, facturaResponse);
}

// PUT: api/Factura/{id}
[HttpPut("{id}")]
public async Task<IActionResult> UpdateFactura(int id, FacturaDto facturaDto)
{
    if (id != facturaDto.Id)
    {
        return BadRequest();
    }

    // Buscar la factura por su ID
    var factura = await _context.Facturas.FindAsync(id);

    if (factura == null)
    {
        return NotFound();
    }

    // Actualizar los datos de la factura
    factura.IdVenta = facturaDto.IdVenta;
    factura.IdMedioPago = facturaDto.IdMedioPago;
    factura.NumeroFactura = facturaDto.NumeroFactura;

    // Guardar los cambios en la base de datos
    await _context.SaveChangesAsync();

    return NoContent();
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
