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
using PeluqueriaWebApi.Models.DTOs.Incoming;

namespace PeluqueriaWebApi.Controllers
{
    [Route("[controller]")]
    public class CompraController : Controller
    {
        private readonly ILogger<CompraController> _logger;
        private PeluqueriaContext _context;
        public CompraController(ILogger<CompraController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<Compra>> Get()
        {
            var compra = await _context.Compras.ToListAsync();

            return Ok(compra);
        }


        [HttpGet("{id}", Name = "GetCompra")]
        public async Task<ActionResult<Compra>> GetById(int id)
        {
            var compra = await _context.Compras.FindAsync(id);

            if (compra == null) return NotFound();

            return compra;
        }


        [HttpPost]
        public async Task<ActionResult<CompraDto>> PostCompra([FromBody] CompraDto compraDto)
        {
            var nuevaCompra = new Compra()
            {
                IdProveedor = compraDto.IdProveedor,
                IdDeposito = compraDto.IdDeposito,
                Fecha = DateTime.Now,
                NotasAdicionales = compraDto.NotasAdicionales,
                Iva = 0,
                Total = 0,
                Eliminado = false
            };

            _context.Compras.Add(nuevaCompra);
            _context.SaveChanges();

            var totalVenta = 0M;
            var totalIva = 0M;
            //Detalles de la compra
            List<DetalleCompraDto>? listDetalles = compraDto.DetalleCompraDtos;
            foreach (var detalles in listDetalles)
            {
                var subTotal = detalles.Cantidad * detalles.PrecioUnitario;
                var iva = detalles.Iva / 100;

                var nuevoDetalle = new DetallesCompra()
                {
                    IdCompra = nuevaCompra.Id,
                    IdProducto = detalles.IdProducto,
                    Cantidad = detalles.Cantidad,
                    PrecioUnitario = detalles.PrecioUnitario,
                    SubTotal = subTotal,
                    Iva = iva,
                    Eliminado = false
                };
                _context.DetallesCompras.Add(nuevoDetalle);
                _context.SaveChanges();

                //Stock Producto
                var stockProducto = _context.StockProductos.SingleOrDefault(s => s.IdProducto == nuevoDetalle.IdProducto && s.IdDeposito == nuevaCompra.IdDeposito && s.IdProveedor == nuevaCompra.IdProveedor);

                if (stockProducto != null)
                {
                    stockProducto.Cantidad += nuevoDetalle.Cantidad;
                    await _context.SaveChangesAsync();

                }
                else
                {
                    var stockDto = new StockCreationDto()
                    {
                        IdProducto = nuevoDetalle.IdProducto,
                        IdDeposito = nuevaCompra.IdDeposito,
                        IdProveedor = nuevaCompra.IdProveedor,
                        Cantidad = nuevoDetalle.Cantidad
                    };

                    var stockController = new StockProductoController(_context);
                    await stockController.PostStock(stockDto);
                }

                totalVenta += subTotal; //Total de la venta

                if (iva != 0)  totalIva += subTotal * iva;
                
            }

            nuevaCompra.Total = totalVenta;
            nuevaCompra.Iva = totalIva;
            await _context.SaveChangesAsync();
            return new CreatedAtRouteResult("GetCompra", new { id = nuevaCompra.Id }, compraDto);
        }



    }
}