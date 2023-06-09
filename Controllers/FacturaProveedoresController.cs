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


[HttpGet("{idStockProductos}/productos")]
public IActionResult ObtenerProductos(int idStockProductos)
{
    try
    {
        var stockProducto = _context.StockProductos
            .Include(sp => sp.IdProductoNavigation)
            .Include(sp => sp.IdProveedorNavigation)
                .ThenInclude(p => p.IdPersonaNavigation)
            .FirstOrDefault(sp => sp.Id == idStockProductos);

        if (stockProducto == null)
        {
            return NotFound(); // Stock de productos no encontrado
        }

        var proveedor = stockProducto.IdProveedorNavigation;
        var productos = new
        {
            Producto = new
            {
                stockProducto.IdProductoNavigation.Nombre,
                stockProducto.IdProductoNavigation.PrecioUnitario,
                stockProducto.IdProductoNavigation.Iva,
                stockProducto.Cantidad
            },
            Proveedor = new
            {
                proveedor.NombreEmpresa,
                proveedor.Ruc,
                proveedor.IdPersonaNavigation.Telefono,
                proveedor.IdPersonaNavigation.Correo,
                proveedor.IdPersonaNavigation.Direccion
            }
        };

        return Ok(productos); // Respuesta exitosa con los productos y la información del proveedor
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message); // Error interno del servidor
    }
}

///////////
[HttpPost]
public IActionResult AgregarFacturaProveedor([FromBody] int idStockProducto)
{
    try
    {
        var stockProducto = _context.StockProductos.FirstOrDefault(sp => sp.Id == idStockProducto);

        if (stockProducto == null)
        {
            return NotFound(); // Stock de producto no encontrado
        }

        var facturaProveedor = new FacturaProveedore
        {
            IdStockProductos = stockProducto.Id,
            FechaEmision = DateTime.Now,
            Eliminado = false,
            IdMedioPago=1,
        };

        _context.FacturaProveedores.Add(facturaProveedor);
        _context.SaveChanges();

        return Ok(); // Respuesta exitosa
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message); // Error interno del servidor
    }
}



    }
}
