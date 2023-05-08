using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models.DTOs.Outgoing;
using PeluqueriaWebApi.Models.DTOs.Incoming;

namespace PeluqueriaWebApi.Controllers
{
    [Route("[controller]")]
    public class StockProductoController : Controller
    {

        private PeluqueriaContext _context;
        public StockProductoController(PeluqueriaContext context)
        {
            _context = context;
        }

        /*[HttpGet("getStockProductos/")]
        public async Task<ActionResult<List<StockProductoDto>>> GetStockProductos()
        {
            var stockProductos = await _context.StockProductos.ToListAsync();
            var tiposProductos = await _context.TiposProductos.ToListAsync();
            var productos = await _context.Productos.ToListAsync();
            var depositos = await _context.Depositos.ToListAsync();

            try
            {
                var result = from stock in stockProductos
                             join prod in productos
                             on stock.IdProducto equals prod.Id
                             join dep in depositos
                             on stock.IdDeposito equals dep.Id
                             join tipoPrd in tiposProductos
                             on prod.IdTipoProducto equals tipoPrd.Id
                             select new StockProductoDto()
                             {
                                 
                                 Nombre = prod.Nombre,
                                 PrecioUnitario = prod.PrecioUnitario,
                                 Cantidad = stock.Cantidad,
                                 DescripcionTipoProducto = tipoPrd.Descripcion,
                                 SectorDeposito = dep.Sector,
                                 DescripcionDeposito = dep.Descripcion,
                                 Eliminado = false
                             };

                return result != null ? Ok(result.ToList()) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }*/

        /*[HttpGet("getStockProductos/")]
        public async Task<ActionResult<List<StockProductoDto>>> GetStockProductos()
        {
            var compras = await _context.Compras.ToListAsync();
            var detallesCompras = await _context.DetallesCompras.ToListAsync();
            var depositos = await _context.Depositos.ToListAsync();

            var result = from stock in StockProducto
                         join 
         return null;
        }*/


        [HttpGet]
        public async Task<ActionResult<StockProducto>> Get()
        {
            var Result = await _context.StockProductos.ToListAsync();
            return Ok(Result);
        }

        [HttpPost]
        public async Task<ActionResult<StockProducto>> PostStock(StockCreationDto stockDto)
        {
            Console.WriteLine("ESTOY AQUI x2");
            var stock = new StockProducto()
            {
               IdProveedor = stockDto.IdProveedor,
               IdDeposito = stockDto.IdDeposito,
               IdProducto = stockDto.IdProducto,
               Cantidad = stockDto.Cantidad,
               Eliminado = false
            };
            
            _context.StockProductos.Add(stock);
            await _context.SaveChangesAsync();

             return new CreatedAtRouteResult("GetStockProducto", new { id = stock.Id}, stock);
        }

        [HttpGet("{id}", Name = "GetStockProducto")]
        public async Task<ActionResult<StockProducto>> GetProducto(int id)
        {
            var producto = await _context.StockProductos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }
            return producto;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<StockProducto>> UpdateStockProducto(int id, StockProducto stockProducto)
        {
            if (id != stockProducto.Id) return BadRequest();

            _context.Entry(stockProducto).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(stockProducto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<StockProducto>> DeletePersona(int id)
        {
            var stockProducto = _context.StockProductos.FirstOrDefault(x => x.Id == id);

            if (stockProducto == null)
                return NotFound();

            stockProducto.Eliminado = true;
            await _context.SaveChangesAsync();

            return Ok(stockProducto);
        }


    }
}