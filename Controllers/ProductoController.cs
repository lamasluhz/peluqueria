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
    public class ProductoController : Controller
    {
        private readonly ILogger<ProductoController> _logger;
        private PeluqueriaContext _context;

        public ProductoController(ILogger<ProductoController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ProductoDto>> Get()
        {
            var productos = await _context.Productos.ToListAsync();
            var tipos = await _context.TiposProductos.ToListAsync();

            var result = (from pdto in productos
                          join tpdto in tipos
                          on pdto.IdTipoProducto equals tpdto.Id
                          select new ProductoDto()
                          {
                              Id = pdto.Id,
                              Categoria = tpdto.Descripcion,
                              Nombre = pdto.Nombre,
                              PrecioUnitario = pdto.PrecioUnitario,
                              NotasAdicionales = pdto.NotasAdicionales,
                              Iva = pdto.Iva,
                              Eliminado = pdto.Eliminado
                          }).ToList();
            return result != null ? Ok(result) : BadRequest("Error");

        }

        [HttpPost]
        public async Task<ActionResult<ProductoCreationDto>> Post(ProductoCreationDto productoDto)
        {
            var _producto = new Producto()
            {
                Nombre = productoDto.Nombre,
                IdTipoProducto = productoDto.IdTipoProducto,
                PrecioUnitario = productoDto.PrecioUnitario,
                NotasAdicionales = productoDto.NotasAdicionales,
                Iva = productoDto.Iva,
                Eliminado = false
            };
            _context.Productos.Add(_producto);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetProducto", new { id = _producto.Id }, _producto);
        }

        [HttpGet("{id}", Name = "GetProducto")]
        public async Task<ActionResult<ProductoDto>> GetProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null) return NotFound();

            var tipo = await _context.TiposProductos.FirstOrDefaultAsync(a => a.Id == producto.IdTipoProducto);

            var result = new ProductoDto()
            {
                Id = producto.Id,
                Categoria = tipo.Descripcion,
                Nombre = producto.Nombre,
                PrecioUnitario = producto.PrecioUnitario,
                NotasAdicionales = producto.NotasAdicionales,
                Iva = producto.Iva,
                Eliminado = producto.Eliminado
            };

            return result != null ? Ok(result) : BadRequest("Error");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductoDto>> Update(int id, ProductoCreationDto productoDto)
        {
            var producto = _context.Productos.FirstOrDefault(a => a.Id == id);

            if (producto == null) return NotFound();

            producto.IdTipoProducto = productoDto.IdTipoProducto;
            producto.Nombre = productoDto.Nombre;
            producto.PrecioUnitario = productoDto.PrecioUnitario;
            producto.NotasAdicionales = productoDto.NotasAdicionales;
            producto.Iva = productoDto.Iva;

            await _context.SaveChangesAsync();

            var tipo = _context.TiposProductos.Find(producto.IdTipoProducto);

            var productoUpdate = new ProductoDto()
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Categoria = tipo.Descripcion,
                PrecioUnitario = producto.PrecioUnitario,
                NotasAdicionales = producto.NotasAdicionales,
                Eliminado = producto.Eliminado
            };

            return Ok(productoUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var producto = _context.Productos.FirstOrDefault(x => x.Id == id);

            if (producto == null)
                return NotFound();

            producto.Eliminado = true;
            await _context.SaveChangesAsync();

            return Ok();
        }


    }
}