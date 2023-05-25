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

        private PeluqueriaContext _context;

        public VentaController(ILogger<VentaController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Venta>> Get(){
            var ventas = _context.Ventas.ToListAsync();
            return Ok(ventas);    
        }

        [HttpGet("{id}", Name = "GetVenta")]
        public async Task<ActionResult<Venta>> GetById(int id){
            var venta = _context.Ventas.FindAsync(id);
            if (venta == null) return NotFound();

            return Ok(venta);
        }

        [HttpPost]
        public async Task<ActionResult<Venta>> Post([FromBody] VentaDto ventaDto){
            var nuevaVenta = new Venta{
                IdCliente = ventaDto.IdCliente,
                IdDeposito = ventaDto.IdDeposito,
                Total = 0,
                NotasAdicionales = "Ventas Realizadas",
                Iva = 0,
                Eliminado = false
            };
             _context.Ventas.Add(nuevaVenta);
             _context.SaveChanges();

            foreach(var detalle in ventaDto.DetalleVentaDto){
                var totalProducto = (detalle.PrecioUnitario * detalle.Cantidad);
                //var totalTurno = _context.DetallesTurnos
                                //.Where(d => d.IdTurno == detalle.IdTurno)
                                //.Sum(d=> )
                var nuevoDetalle = new VentasDetalle{
                    IdVenta = nuevaVenta.Id,
                    IdProducto = detalle.IdProducto,
                    IdTurno = detalle.IdTurno,
                    Cantidad = detalle.Cantidad,
                    PrecioUnitario = detalle.PrecioUnitario,
                    //SubTotal = 
                };
            }
            return null;
        }
        

    }
}