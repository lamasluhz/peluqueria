using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models;
using PeluqueriaWebApi.Models.DTOs.Outgoing;

namespace PeluqueriaWebApi.Controllers
{
    [Route("[controller]")]
    public class VentaController : Controller
    {
        private readonly ILogger<VentaController> _logger;
        private readonly PeluqueriaContext _context;

        public VentaController(ILogger<VentaController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Venta>>> Get()
        {
            var ventas = await _context.Ventas.ToListAsync();
            return Ok(ventas);
        }

        [HttpGet("{id}", Name = "GetVenta")]
        public async Task<ActionResult<Venta>> GetById(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);
            if (venta == null)
                return NotFound();

            return Ok(venta);
        }

        [HttpPost("/ProductosyServicios")]
        public async Task<ActionResult<Venta>> PostProductosyServicios([FromBody] VentaDto ventaDto)
        {
            try
            {
                var nuevaVenta = new Venta
                {
                    IdCliente = ventaDto.IdCliente,
                    IdDeposito = ventaDto.IdDeposito,
                    IdTurno = ventaDto.IdTurno,
                    Total = 0,
                    NotasAdicionales = "Ventas Realizadas",
                    Iva = 0,
                    Eliminado = false
                };

                _context.Ventas.Add(nuevaVenta);
                await _context.SaveChangesAsync();

                Console.WriteLine("ID TURNO: " + nuevaVenta.IdTurno);

                var totalServicio = await CalcularTotalServicio(nuevaVenta);
                var totalProducto = await CalcularTotalProducto(nuevaVenta, ventaDto.DetalleVentaDto);

                nuevaVenta.Total = totalServicio + totalProducto;
                await _context.SaveChangesAsync();

                return CreatedAtRoute("GetVenta", new { id = nuevaVenta.Id }, ventaDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en la operación");
                return StatusCode(500, "Error en la operación");
            }
        }

        private async Task<decimal> CalcularTotalServicio(Venta nuevaVenta)
        {
            var detallesTurnos = await _context.DetallesTurnos
                .Where(d => d.IdTurno == nuevaVenta.IdTurno)
                .ToListAsync();

            decimal totalServicio = 0M;
            foreach (var turno in detallesTurnos)
            {
                var idServicio = turno.IdTipoServicio;
                var servicio = await _context.TiposServicios.FindAsync(idServicio);
                totalServicio += (decimal)servicio.DecMonto;
                Console.WriteLine("Total del servicio: " + totalServicio);
            }


            return totalServicio;
        }

        private async Task<decimal> CalcularTotalProducto(Venta nuevaVenta, List<DetalleVentaDto> detalleVentaDto)
        {
            decimal totalProducto = 0;
            decimal totalIvaProducto = 0;

            foreach (var detalle in detalleVentaDto)
            {
                var subTotalProducto = detalle.PrecioUnitario * detalle.Cantidad;
                var ivaProducto = detalle.Iva / 100;

                var nuevoDetalle = new VentasDetalle
                {
                    IdVenta = nuevaVenta.Id,
                    IdProducto = detalle.IdProducto,
                    Cantidad = detalle.Cantidad,
                    PrecioUnitario = detalle.PrecioUnitario,
                    SubTotal = subTotalProducto,
                    Iva = ivaProducto,
                    Eliminado = false
                };

                _context.VentasDetalles.Add(nuevoDetalle);
                await _context.SaveChangesAsync();

                totalProducto += subTotalProducto;
                totalIvaProducto += ivaProducto;
            }

            nuevaVenta.Iva = totalIvaProducto;
            await _context.SaveChangesAsync();

            Console.WriteLine("Total del Producto: " + totalProducto);
            Console.WriteLine("Total del Iva: " + totalIvaProducto);

            return totalProducto;
        }

        [HttpPost("/Productos")] 
        public async Task<ActionResult<Venta>> PostProductos([FromBody] VentaDto ventaDto)
        {
            try
            {
                var nuevaVenta = new Venta
                {
                    IdCliente = ventaDto.IdCliente,
                    IdDeposito = ventaDto.IdDeposito,
                    IdTurno = null,
                    Total = 0,
                    NotasAdicionales = "Ventas Realizadas",
                    Iva = 0,
                    Eliminado = false
                };

                _context.Ventas.Add(nuevaVenta);
                await _context.SaveChangesAsync();

                var totalProducto = await CalcularTotalProducto(nuevaVenta, ventaDto.DetalleVentaDto);

                nuevaVenta.Total = totalProducto;
                nuevaVenta.Iva = totalProducto;

                await _context.SaveChangesAsync();

                return CreatedAtRoute("GetVenta", new { id = nuevaVenta.Id }, ventaDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en la operación");
                return StatusCode(500, "Error en la operación");
            }
        }

        [HttpPost("/Servicios")]
        public async Task<ActionResult<Venta>> PostServicios([FromBody] VentaDto ventaDto)
        {
            try
            {
                var nuevaVenta = new Venta
                {
                    IdCliente = ventaDto.IdCliente,
                    IdDeposito = ventaDto.IdDeposito,
                    IdTurno = ventaDto.IdTurno,
                    Total = 0,
                    NotasAdicionales = "Ventas Realizadas",
                    Iva = 0,
                    Eliminado = false
                };

                _context.Ventas.Add(nuevaVenta);
                await _context.SaveChangesAsync();

                var totalServicio = await CalcularTotalServicio(nuevaVenta);

                nuevaVenta.Total = totalServicio;
                await _context.SaveChangesAsync();

                return CreatedAtRoute("GetVenta", new { id = nuevaVenta.Id }, ventaDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en la operación");
                return StatusCode(500, "Error en la operación");
            }
        }
    }
}
