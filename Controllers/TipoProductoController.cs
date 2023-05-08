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

namespace PeluqueriaWebApi.Controllers
{
    [Route("[controller]")]
    public class TipoProductoController : Controller
    {
        private readonly ILogger<TipoProductoController> _logger;
        private PeluqueriaContext _context;
        public TipoProductoController(ILogger<TipoProductoController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<TiposProducto>> GetTipoProducto()
        {
            var tipos = await _context.TiposProductos.ToListAsync();

            return Ok(tipos);
        }

        [HttpPost]
        public async Task<ActionResult<TipoProductoDto>> Post(TipoProductoDto tiposDto)
        {
            var nuevoTipo = new TiposProducto()
            {
                Descripcion = tiposDto.Descripcion,
                Eliminado = false
            };

            _context.TiposProductos.Add(nuevoTipo);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetTipoProducto", new { id = nuevoTipo.Id }, nuevoTipo);
        }

        [HttpGet("{id}", Name = "GetTipoProducto")]
        public async Task<ActionResult<TiposProducto>> GetTipoProducto(int id)
        {
            var tipos = await _context.TiposProductos.FindAsync(id);

            if (tipos == null)
            {
                return NotFound();
            }
            return tipos;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TiposProducto>> Update(int id, TipoProductoDto tipoDto)
        {
            var tipo = _context.TiposProductos.FirstOrDefault(x => x.Id == id);

            if (tipo == null) return BadRequest();

            tipo.Descripcion = tipoDto.Descripcion;
        
            await _context.SaveChangesAsync();

            return Ok(tipo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TiposProducto>> Delete(int id)
        {
            var tipo = _context.TiposProductos.FirstOrDefault(x => x.Id == id);

            if (tipo == null)
                return NotFound();

            tipo.Eliminado = true;
            await _context.SaveChangesAsync();

            return Ok(tipo);
        }     




    }
}