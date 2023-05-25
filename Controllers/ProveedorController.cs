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
    public class ProveedorController : Controller
    {
        private readonly ILogger<ProveedorController> _logger;
        private PeluqueriaContext _context;

        public ProveedorController(ILogger<ProveedorController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Proveedore>> Get()
        {
            var Result = await _context.Proveedores.ToListAsync();
            return Ok(Result);
        }


        [HttpGet("{id}", Name = "GetProveedor")]
        public async Task<ActionResult<Proveedore>> GetById(int id)
        {
            var proveedor = await _context.Proveedores.FindAsync(id);

            if (proveedor == null) return NotFound();

            return proveedor;
        }


        [HttpGet("{id}", Name = "GetProveedorEmpresa")]
        public async Task<ActionResult<ProveedorEmpresaDto>> GetProveedorEmpresa(int id)
        {
            var proveedor = await _context.Proveedores.FindAsync(id);
            if (proveedor == null) return NotFound();

            var result = new ProveedorEmpresaDto
            {
                Id = proveedor.Id,
                NombreEmpresa = proveedor.NombreEmpresa,
                Ruc = proveedor.Ruc
            };

            return result;
        }

        [HttpGet("GetProveedores/")]
        public async Task<ActionResult<List<ProveedorDto>>> GetProveedores()
        {
            var proveedores = await _context.Proveedores.ToListAsync();
            var personas = await _context.Personas.ToListAsync();

            try
            {
                var result = from per in personas
                             join prov in proveedores
                             on per.Id equals prov.IdPersona
                             where prov.Eliminado != true
                             select new ProveedorDto()
                             {
                                 Id = prov.Id,
                                 Nombres = per.Nombres,
                                 Apellidos = per.Apellidos,
                                 Cedula = per.Cedula,
                                 Correo = per.Correo,
                                 Telefono = per.Telefono,
                                 Direccion = per.Direccion,
                                 Eliminado = prov.Eliminado,
                                 NombreEmpresa = prov.NombreEmpresa,
                                 Ruc = prov.Ruc
                             };

                return result != null ? Ok(result.ToList()) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpGet("GetProductosProveedor/{id}")]
        public async Task<ActionResult<List<ProveedorDto>>> GetProductosProveedor(int id)
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
                             where pvdr.Id == id
                             select new ProductoDto
                             {
                                 Id = prod.Id,
                                 Nombre = prod.Nombre,
                                 Categoria = tipoPrd.Descripcion,
                                 PrecioUnitario = prod.PrecioUnitario,
                                 NotasAdicionales = prod.NotasAdicionales,
                                 Iva = prod.Iva,
                                 Eliminado = prod.Eliminado
                             };

                return result != null ? Ok(result.ToList()) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ProveedorDto>> PostProveedor(ProveedorCreationDto proveedorDto)
        {
            var _persona = new Persona()
            {
                Nombres = proveedorDto.Nombres,
                Apellidos = proveedorDto.Apellidos,
                Cedula = proveedorDto.Cedula,
                Correo = proveedorDto.Correo,
                Telefono = proveedorDto.Telefono,
                Direccion = proveedorDto.Direccion,
                Eliminado = false
            };
            _context.Personas.Add(_persona);
            _context.SaveChanges();

            var _proveedor = new Proveedore()
            {
                IdPersona = _persona.Id,
                NombreEmpresa = proveedorDto.NombreEmpresa,
                Ruc = proveedorDto.Ruc,
                Eliminado = false
            };
            _context.Proveedores.Add(_proveedor);
            _context.SaveChanges();
            await _context.SaveChangesAsync();
            return new CreatedAtRouteResult("GetProveedor", new { id = _proveedor.Id }, proveedorDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProveedorDto>> PutProveedor(int id, ProveedorDto proveedorDto)
        {
            if (id == proveedorDto.Id) return BadRequest();
            var _proveedor = await _context.Proveedores.FindAsync(id);
            if (_proveedor == null) return NotFound();

            var _persona = await _context.Personas.FirstOrDefaultAsync(a => a.Id == _proveedor.IdPersona);
            _persona.Nombres = proveedorDto.Nombres;
            _persona.Apellidos = proveedorDto.Apellidos;
            _persona.Cedula = proveedorDto.Cedula;
            _persona.Correo = proveedorDto.Correo;
            _persona.Direccion = proveedorDto.Direccion;
            _persona.Telefono = proveedorDto.Telefono;

            _proveedor.NombreEmpresa = proveedorDto.NombreEmpresa;
            _proveedor.Ruc = proveedorDto.Ruc;

            await _context.SaveChangesAsync();

            return Ok(proveedorDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Peluquero>> DeleteProveedor(int id)
        {
            var _proveedor = _context.Proveedores.FirstOrDefault(x => x.Id == id);

            if (_proveedor == null)
                return NotFound();

            _proveedor.Eliminado = true;
            _proveedor.IdPersonaNavigation.Eliminado = true;

            await _context.SaveChangesAsync();

            return Ok(_proveedor);
        }


    }
}