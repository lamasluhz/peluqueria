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
    public class FacturaProveedoresController : Controller
    {
        private readonly ILogger<FacturaProveedore> _logger;
        private PeluqueriaContext _context;
        public FacturaProveedoresController(ILogger<FacturaProveedore> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }
     
////////////

[HttpGet("facturaProveedores")]
public IActionResult ObtenerFacturasProveedor()
{
    try
    {
        var facturasProveedor = _context.FacturaProveedores
            .Include(fp => fp.IdCompraNavigation)
                .ThenInclude(c => c.IdProveedorNavigation)
            .ToList();

        var respuesta = facturasProveedor.Select(facturaProveedor => new
        {
            FacturaProveedor = new
            {
                facturaProveedor.Id,
                FechaEmision = facturaProveedor.FechaEmision.ToString("yyyy-MM-dd"),
                Estado = facturaProveedor.Estado
            },
            Proveedor = new
            {
                facturaProveedor.IdCompraNavigation.IdProveedorNavigation.NombreEmpresa
            },
            TotalProductos = facturaProveedor.IdCompraNavigation.Total
        });

        return Ok(respuesta); // Respuesta exitosa con todas las facturas de proveedores
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}

///////////
//post 
[HttpPost]
public IActionResult AgregarIdCompraFactura([FromBody] IdCompraDto idCompraDto)
{
    if (ModelState.IsValid)
    {
        var compra = _context.Compras.FirstOrDefault(v => v.Id == idCompraDto.IdCompra);

        if (compra == null)
        {
            return NotFound(); // La venta no existe, devolver un código de respuesta 404
        }

        var factura = new FacturaProveedore
        {
            IdCompra = idCompraDto.IdCompra,
            FechaEmision = DateTime.Today, // Establece la fecha de emisión como la fecha actual
            IdMedioPago= 1,
            Estado = "Pendiente", // Establece el estado inicial de la factura
        };

        _context.FacturaProveedores.Add(factura);
        _context.SaveChanges();

        return Ok(factura.Id); // Devuelve el ID de la factura creada
    }

    return BadRequest(ModelState);
}
////////// put 
/// put medio de pago 
[HttpPut("FacturaProveedores")]
public IActionResult ActualizarMedioPagoFactura([FromBody] ActualizarMedioPagoDto dto)
{
    try
    {
        // Verificar si existe la factura
        var factura = _context.FacturaProveedores.FirstOrDefault(f => f.Id == dto.IdFactura);
        if (factura == null)
        {
            return NotFound(); // Factura no encontrada
        }

        // Verificar si existe el medio de pago
        var medioPago = _context.MediosPagos.FirstOrDefault(mp => mp.Id == dto.IdMedioPago);
        if (medioPago == null)
        {
            return NotFound(); // Medio de pago no encontrado
        }

         // Actualizar el medio de pago de la factura y el estado 
                factura.Estado = "Facturado";
                factura.IdMedioPago = dto.IdMedioPago;
                _context.SaveChanges();

        return Ok(); // Actualización exitosa
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}

//////get completo para factura detalle 

[HttpGet("facturaProveedoresGeneral/{id}")]
public IActionResult ObtenerFacturaProveedorGeneral(int id)
{
    try
    {
        var facturaProveedor = _context.FacturaProveedores
            .Include(fp => fp.IdCompraNavigation)
                .ThenInclude(c => c.IdProveedorNavigation)
                    .ThenInclude(p => p.IdPersonaNavigation)
            .Include(fp => fp.IdCompraNavigation)
                .ThenInclude(c => c.DetallesCompras)
                    .ThenInclude(dc => dc.IdProductoNavigation)
            .Include(fp => fp.IdMedioPagoNavigation)
            .FirstOrDefault(fp => fp.Id == id);

        if (facturaProveedor == null)
        {
            return NotFound(); // Factura de proveedores no encontrada
        }

        var proveedor = facturaProveedor.IdCompraNavigation.IdProveedorNavigation;
        var persona = proveedor.IdPersonaNavigation;
        var compra = facturaProveedor.IdCompraNavigation;
        var detallesCompras = compra.DetallesCompras;

        decimal cantidadTotal = detallesCompras.Sum(dc => dc.Cantidad);
        decimal totalProductos = detallesCompras.Sum(dc => dc.SubTotal);

        var productos = detallesCompras.Select(dc => new
        {
            Producto = dc.IdProductoNavigation.Nombre,
            Cantidad = dc.Cantidad,
            Precio = dc.PrecioUnitario,
            Total = dc.Cantidad * dc.PrecioUnitario,
            Iva = dc.IdProductoNavigation.Iva
        });

        var respuesta = new
        {
            FacturaProveedor = new
            {
                facturaProveedor.Id,
                FechaEmision = facturaProveedor.FechaEmision.ToString("yyyy-MM-dd"),
                MedioPago = facturaProveedor.IdMedioPagoNavigation.Descripcion,
                facturaProveedor.NumeroFactura,
                Estado = facturaProveedor.Estado
            },
            Proveedor = new
            {
                proveedor?.NombreEmpresa,
                Persona = new
                {
                    persona?.Nombres,
                    persona?.Apellidos,
                    persona?.Cedula,
                    persona?.Correo,
                    persona?.Direccion,
                    persona?.Telefono
                },
                proveedor?.Ruc
            },
            TotalProductos = totalProductos,
            CantidadTotal = cantidadTotal,
            Productos = productos
        };

        return Ok(respuesta); // Respuesta exitosa con los detalles de la factura de proveedores
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}




    }
}
