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

        [HttpGet("GetStockProductos/")]
        public async Task<ActionResult<List<StockProductoDto>>> GetStockProductos()
        {
            var stockProductos = await _context.StockProductos.ToListAsync();
            var tiposProductos = await _context.TiposProductos.ToListAsync();
            var productos = await _context.Productos.ToListAsync();
            var depositos = await _context.Depositos.ToListAsync();
            var proveedores = await _context.Proveedores.ToListAsync();

            try
            {
                var result = from stock in stockProductos
                             join prod in productos
                             on stock.IdProducto equals prod.Id
                             join pvdr in proveedores
                             on stock.IdProveedor equals pvdr.Id
                             join dep in depositos
                             on stock.IdDeposito equals dep.Id
                             join tipoPrd in tiposProductos
                             on prod.IdTipoProducto equals tipoPrd.Id

                             select new StockProductoDto()
                             {

                                 Nombre = prod.Nombre,
                                 Proveedor = pvdr.NombreEmpresa,
                                 PrecioUnitario = prod.PrecioUnitario,
                                 Cantidad = stock.Cantidad,
                                 DescripcionTipoProducto = tipoPrd.Descripcion,
                                 SectorDeposito = dep.Sector,
                                 Eliminado = stock.Eliminado
                             };

                return result != null ? Ok(result.ToList()) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet]
        public async Task<ActionResult<StockProducto>> Get()
        {
            var Result = await _context.StockProductos.ToListAsync();
            return Ok(Result);
        }

        [HttpPost]
        public async Task<ActionResult<StockProducto>> PostStock(StockCreationDto stockDto)
        {
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

            return new CreatedAtRouteResult("GetStockProducto", new { id = stock.Id }, stock);
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



        [HttpPut("Update/{id}")]
        public async Task<ActionResult<StockProductoDto>> PutStockProducto(int id, StockProductoDto2 stockProductoDto)
        {
            if (id != stockProductoDto.Id) return BadRequest();
            var stock = await _context.StockProductos.FindAsync(id);
            if (stock == null) return NotFound();

            var proveedor = await _context.Proveedores.FindAsync(stock.IdProveedor);
            proveedor.NombreEmpresa = stockProductoDto.Proveedor;
            await _context.SaveChangesAsync();

            var producto = await _context.Productos.FindAsync(stock.IdProducto);
            producto.Nombre = stockProductoDto.Nombre;
            producto.PrecioUnitario = stockProductoDto.PrecioUnitario;
            producto.IdTipoProductoNavigation.Descripcion = stockProductoDto.DescripcionTipoProducto;
            await _context.SaveChangesAsync();

            var sector = await _context.Depositos.FindAsync(stock.IdDeposito);
            sector.Sector = stockProductoDto.SectorDeposito;
            await _context.SaveChangesAsync();

            return Ok(stockProductoDto);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<StockProducto>> DeleteStock(int id)
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