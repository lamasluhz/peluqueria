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
        [HttpGet]
        public IActionResult GetFacturas()
        {
            var facturas = _context.Facturas
                .Include(f => f.IdVentaNavigation)
                    .ThenInclude(v => v.IdClienteNavigation)
                        .ThenInclude(c => c.IdPersonaNavigation)
                .Include(f => f.IdVentaNavigation.VentasDetalles)
                    .ThenInclude(d => d.IdProductoNavigation)
                .Select(f => new FacturaDTO
                {
                    Id = f.Id,
                    FechaEmision = f.FechaEmision,
                    Estado = f.Estado,
                    TotalVenta = f.IdVentaNavigation.Total,
                    NombreCliente = f.IdVentaNavigation.IdClienteNavigation.IdPersonaNavigation.Nombres,
                    ApellidoCliente = f.IdVentaNavigation.IdClienteNavigation.IdPersonaNavigation.Apellidos
                })
                .ToList();

            return Ok(facturas);
        }

        //post 
        [HttpPost]
        public IActionResult AgregarIdVentaAFactura([FromBody] IdVentaDto idVentaDto)
        {
            if (ModelState.IsValid)
            {
                var venta = _context.Ventas.FirstOrDefault(v => v.Id == idVentaDto.IdVenta);

                if (venta == null)
                {
                    return NotFound(); // La venta no existe, devolver un código de respuesta 404
                }

                var factura = new Factura
                {
                    IdVenta = idVentaDto.IdVenta,
                    FechaEmision = DateTime.Today, // Establece la fecha de emisión como la fecha actual
                    IdMedioPago = 1,
                    Estado = "Pendiente", // Establece el estado inicial de la factura
                                          // NumeroFactura = "0000-0000-00"+idVentaDto.ToString // Genera el número de factura (debes implementar tu propia lógica para esto)
                                          //NumeroFactura=
                };

                _context.Facturas.Add(factura);
                _context.SaveChanges();

                return Ok(factura.Id); // Devuelve el ID de la factura creada
            }

            return BadRequest(ModelState);
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


        /// put medio de pago 
        [HttpPut("facturas")]
        public IActionResult ActualizarMedioPagoFactura([FromBody] ActualizarMedioPagoDto dto)
        {
            try
            {
                // Verificar si existe la factura
                var factura = _context.Facturas.FirstOrDefault(f => f.Id == dto.IdFactura);
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
        ////// get mas generales 
        [HttpGet("facturas/{id}")]
        public IActionResult ObtenerFactura(int id)
        {
            try
            {
                var factura = _context.Facturas
             .Include(f => f.IdVentaNavigation)
                 .ThenInclude(v => v.IdClienteNavigation)
                     .ThenInclude(c => c.IdPersonaNavigation)
             .Include(f => f.IdVentaNavigation.VentasDetalles)
                 .ThenInclude(d => d.IdProductoNavigation)
             .Include(f => f.IdVentaNavigation.IdTurnoNavigation)
                 .ThenInclude(t => t.DetallesTurnos)
                     .ThenInclude(dt => dt.IdTipoServicioNavigation)
             .Include(f => f.IdMedioPagoNavigation) // Incluir medio de pago
             .FirstOrDefault(f => f.Id == id);

                if (factura == null)
                {
                    return NotFound(); // Factura no encontrada
                }

                var cliente = factura.IdVentaNavigation.IdClienteNavigation.IdPersonaNavigation;

                var productos = factura.IdVentaNavigation.VentasDetalles
             .Where(d => d.IdProductoNavigation != null) // Filtrar los detalles de venta con productos no nulos
             .Select(d => new
             {
                 d.IdProductoNavigation.Nombre,
                 d.Cantidad,
                 d.PrecioUnitario,
                 total = d.PrecioUnitario * d.Cantidad,
                 d.IdProductoNavigation.Iva
             });

                var servicios = factura.IdVentaNavigation.IdTurnoNavigation?.DetallesTurnos
                    .Where(dt => dt.IdTipoServicioNavigation != null) // Filtrar los detalles de turno con servicios no nulos
                    .Select(dt => new
                    {
                        dt.IdTipoServicioNavigation.Tipo,
                        dt.IdTipoServicioNavigation.Descripcion,
                        dt.IdTipoServicioNavigation.DecMonto
                    });
                var ventas = factura.IdVentaNavigation;
                var respuesta = new
                {
                    Factura = new
                    {
                        factura.Id,
                        factura.FechaEmision,
                        factura.Estado,
                        MedioPago = factura.IdMedioPagoNavigation.Descripcion, // Incluir medio de pago
                        factura.NumeroFactura
                    },
                    Cliente = new
                    {
                        cliente.Nombres,
                        cliente.Apellidos,
                        cliente.Telefono,
                        cliente.Cedula,
                        cliente.Direccion,
                        cliente.Correo
                    },
                    Ventas = new
                    {
                        ventas.Total,
                        // IvaProductos = productos.Sum(p => p.total * (p..Iva ?? 0)), // Calcular el IVA de los productos
                    },
                    Productos = productos,
                    Servicios = servicios,
                };

                return Ok(respuesta); // Respuesta exitosa con los datos de la factura y sus detalles
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Error interno del servidor
            }
        }



    }
}