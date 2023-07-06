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
    public class MovimientosCajaController : Controller
    {
        private readonly ILogger<MovimientosCaja> _logger;
        private PeluqueriaContext _context;
        public MovimientosCajaController(ILogger<MovimientosCaja> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }
     
        // POST: api/MovimientosCaja/entrada
        [HttpPost("entrada")]
        public IActionResult AgregarMovimientoEntrada([FromBody] MovimientoEntradaDto movimientoEntradaDto)
        {
            try
            {
                var nuevoMovimiento = new MovimientosCaja
                {
                    IdCaja = movimientoEntradaDto.IdCaja,
                    TipoMovimiento = "Entrada",
                    Monto = movimientoEntradaDto.Monto,
                    IdFactura = movimientoEntradaDto.IdFactura,
                   IdFacturaProveedor = null,
                    FechaMovimiento = DateTime.Now,
                    Eliminado = false
                };

                _context.MovimientosCajas.Add(nuevoMovimiento);
                _context.SaveChanges();

                return Ok(nuevoMovimiento.IdMovimiento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
            }
        }

        // POST: api/MovimientosCaja/salida
        [HttpPost("salida")]
        public IActionResult AgregarMovimientoSalida([FromBody] MovimientoSalidaDto movimientoSalidaDto)
        {
            try
            {
                var nuevoMovimiento = new MovimientosCaja
                {
                    IdCaja = movimientoSalidaDto.IdCaja,
                    TipoMovimiento = "Salida",
                    Monto = movimientoSalidaDto.Monto,
                    IdFactura = null,
                    IdFacturaProveedor = movimientoSalidaDto.IdFacturaProveedor,
                    
                    FechaMovimiento = DateTime.Now,
                    Eliminado = false
                };

                _context.MovimientosCajas.Add(nuevoMovimiento);
                _context.SaveChanges();

                return Ok(nuevoMovimiento.IdMovimiento);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
            }
        }


// GET: api/MovimientosCaja/entrada/total?fecha=yyyy-MM-dd&idCaja=1
[HttpGet("entrada/totalSuma")]
public IActionResult ObtenerTotalMovimientosEntrada(DateTime fecha, int? idCaja)
{
    try
    {
        IQueryable<MovimientosCaja> query = _context.MovimientosCajas
            .Where(m => m.TipoMovimiento == "Entrada" && m.FechaMovimiento.Date == fecha.Date);

        if (idCaja.HasValue)
        {
            query = query.Where(m => m.IdCaja == idCaja);
        }

        decimal total = query.Sum(m => m.Monto);

        return Ok(total);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

// GET: api/MovimientosCaja/salida/total?fecha=yyyy-MM-dd&idCaja=1
[HttpGet("salida/totalSuma")]
public IActionResult ObtenerTotalMovimientosSalida(DateTime fecha, int? idCaja)
{
    try
    {
        IQueryable<MovimientosCaja> query = _context.MovimientosCajas
            .Where(m => m.TipoMovimiento == "Salida" && m.FechaMovimiento.Date == fecha.Date);

        if (idCaja.HasValue)
        {
            query = query.Where(m => m.IdCaja == idCaja);
        }

        decimal total = query.Sum(m => m.Monto);

        return Ok(total);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

// GET: api/MovimientosCaja
[HttpGet]
public IActionResult ObtenerTodosLosMovimientos()
{
    try
    {
        var movimientos = _context.MovimientosCajas.ToList();
        return Ok(movimientos);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

// GET: api/MovimientosCaja/fecha/{fecha}
[HttpGet("fecha/{fecha}")]
public IActionResult ObtenerMovimientosPorFecha(DateTime fecha)
{
    try
    {
        var movimientos = _context.MovimientosCajas
            .Where(m => m.FechaMovimiento.Date == fecha.Date)
            .ToList();

        return Ok(movimientos);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}


///////// total de la caja con todos los miovimientos  // GET: api/MovimientosCaja/totalPorCaja/{idCaja}
[HttpGet("totalPorCaja/{idCaja}")]
public IActionResult ObtenerTotalPorCaja(int idCaja)
{
    try
    {
        var movimientosPorCaja = _context.MovimientosCajas
            .Where(m => m.IdCaja == idCaja)
            .GroupBy(m => m.IdCaja)
            .Select(g => new
            {
                IdCaja = g.Key,
                TotalEntrada = g.Where(m => m.TipoMovimiento == "Entrada").Sum(m => m.Monto),
                TotalSalida = g.Where(m => m.TipoMovimiento == "Salida").Sum(m => m.Monto),
                Total = g.Where(m => m.TipoMovimiento == "Entrada").Sum(m => m.Monto) - g.Where(m => m.TipoMovimiento == "Salida").Sum(m => m.Monto)
            })
            .SingleOrDefault();

        if (movimientosPorCaja == null)
        {
            return NotFound(); // Caja no encontrada
        }

        return Ok(movimientosPorCaja);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

///para reporte general 
// GET: api/Caja/cajas/{id}/movimientos
[HttpGet("cajas/{id}/movimientosReporte")]
public IActionResult ObtenerMovimientosCaja(int id)
{
    try
    {
        var caja = _context.Cajas.FirstOrDefault(c => c.IdCaja == id);
        if (caja == null)
        {
            return NotFound(); // Caja no encontrada
        }

        var movimientosCaja = _context.MovimientosCajas
            .Where(m => m.IdCaja == id)
            .ToList();

        var resultado = new
        {Movimientos = movimientosCaja.Select(m => new
            {
                TipoMovimiento = m.TipoMovimiento,
                Monto = m.Monto
            }).ToList(),
           
            Diferencia = movimientosCaja.Where(m => m.TipoMovimiento == "Entrada").Sum(m => m.Monto) - movimientosCaja.Where(m => m.TipoMovimiento == "Salida").Sum(m => m.Monto),
           
            Caja = new
            {
                IdCaja =caja.IdCaja,
                HoraInicio = caja.HoraInicial?.ToString("hh\\:mm"),
                HoraFin = caja.HoraFinal?.ToString("hh\\:mm"),
                FechaInicio = caja.FechaApertura.ToString("yyyy-MM-dd"),
                FechaFin = caja.FechaCierre?.ToString("yyyy-MM-dd"),
                MontoApertura = caja.MontoApertura,
                MontoCierre = movimientosCaja.Where(m => m.TipoMovimiento == "Entrada").Sum(m => m.Monto) - movimientosCaja.Where(m => m.TipoMovimiento == "Salida").Sum(m => m.Monto)
            }
            
        };

        return Ok(resultado);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}


///reporte mas general 
// GET: api/MovimientosCaja/cajas/movimientosReporte[HttpGet("cajas/movimientosReporteGeneral")]
[HttpGet("cajas/movimientosReporteGEneral")]
public IActionResult ObtenerMovimientosCajaReportes()
{
    try
    {
        var cajas = _context.Cajas.ToList();
        var movimientosCajas = _context.MovimientosCajas.ToList();

        var resultado = cajas.Select(caja => new
        {
            Caja = new
            {
                IdCaja = caja.IdCaja,
                HoraInicio = caja.HoraInicial?.ToString("hh\\:mm"),
                HoraFin = caja.HoraFinal?.ToString("hh\\:mm"),
                FechaInicio = caja.FechaApertura.ToString("yyyy-MM-dd"),
                FechaFin = caja.FechaCierre?.ToString("yyyy-MM-dd"),
                MontoApertura = caja.MontoApertura,
                MontoCierre = movimientosCajas.Where(m => m.IdCaja == caja.IdCaja && m.TipoMovimiento == "Entrada").Sum(m => m.Monto)+caja.MontoApertura  - movimientosCajas.Where(m => m.IdCaja == caja.IdCaja && m.TipoMovimiento == "Salida").Sum(m => m.Monto)
            },
            Movimientos = movimientosCajas.Where(m => m.IdCaja == caja.IdCaja).Select(m => new
            {
                TipoMovimiento = m.TipoMovimiento,
                Monto = m.Monto
            }).ToList(),
            MovimientoTotalEntrada = movimientosCajas.Where(m => m.IdCaja == caja.IdCaja && m.TipoMovimiento == "Entrada").Sum(m => m.Monto),
            MovimientoTotalSalida = movimientosCajas.Where(m => m.IdCaja == caja.IdCaja && m.TipoMovimiento == "Salida").Sum(m => m.Monto),
            Diferencia = movimientosCajas.Where(m => m.IdCaja == caja.IdCaja && m.TipoMovimiento == "Entrada").Sum(m => m.Monto)+caja.MontoApertura - movimientosCajas.Where(m => m.IdCaja == caja.IdCaja && m.TipoMovimiento == "Salida").Sum(m => m.Monto)
        });

        return Ok(resultado);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}
//f => f.FechaEmision.Date == fecha.Date



[HttpGet("ventasDetalleSalida/{fecha}")]
public IActionResult ObtenerVentasDetalleSalidaPorFecha(DateTime fecha)
{
    try
    {
        var ventasDetalleSalida = _context.FacturaProveedores
            .Where(f => f.FechaEmision.Date == fecha.Date && f.Estado == "Facturado")
            .Include(f => f.IdCompraNavigation)
                .ThenInclude(c => c.DetallesCompras)
                    .ThenInclude(d => d.IdProductoNavigation)
            .SelectMany(f => f.IdCompraNavigation.DetallesCompras)
            .GroupBy(d => new { d.IdProductoNavigation.Nombre, d.PrecioUnitario })
            .Select(g => new
            {
                ProductoNombre = g.Key.Nombre,
                Cantidad = g.Sum(d => d.Cantidad),
                PrecioUnitario = g.Key.PrecioUnitario,
                SubTotal = g.Sum(d => d.SubTotal),
                Iva = g.Sum(d => d.Iva)
            })
            .ToList();

        decimal totalVentas = ventasDetalleSalida.Sum(v => v.SubTotal);
        int totalCantidad = ventasDetalleSalida.Sum(v => v.Cantidad);

        var resultado = new
        {
            VentasDetalleSalida = ventasDetalleSalida,
            TotalVentas = totalVentas,
            TotalCantidad = totalCantidad
        };

        return Ok(resultado);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}



//////
[HttpGet("ventasDetalleEntrada/{fecha}")]
public IActionResult ObtenerVentasDetallePorFecha(DateTime fecha)
{
    try
    {
        var ventasDetalle = _context.Facturas
            .Where(f => f.FechaEmision.Date == fecha.Date  && f.Estado == "Facturado")
            .Include(f => f.IdVentaNavigation)
                .ThenInclude(v => v.VentasDetalles)
                    .ThenInclude(d => d.IdProductoNavigation)
            .SelectMany(f => f.IdVentaNavigation.VentasDetalles)
            .Select(d => new
            {
                ProductoId = d.IdProductoNavigation.IdTipoProducto,
                ProductoNombre = d.IdProductoNavigation.Nombre,
                PrecioUnitario = d.PrecioUnitario,
                Cantidad = d.Cantidad,
                SubTotal = d.SubTotal,
                Iva = d.Iva,
                Servicios = _context.Facturas
                    .Where(f => f.Estado == "Facturado" && f.FechaEmision.Date.Equals(fecha.Date))
                    .SelectMany(f => f.IdVentaNavigation.IdTurnoNavigation.DetallesTurnos)
                    .Where(dt => dt.IdTipoServicioNavigation != null)
                    .Select(dt => new
                    {
                        Cliente = dt.IdTurnoNavigation.IdClienteNavigation.IdPersonaNavigation.Nombres + " " + dt.IdTurnoNavigation.IdClienteNavigation.IdPersonaNavigation.Apellidos,
                        Servicio = dt.IdTipoServicioNavigation.Descripcion,
                        Costo = dt.IdTipoServicioNavigation.DecMonto,
                    })
                    .ToList()
            })
            .ToList();

        // Calcular suma total de ventas
        decimal totalVentas = ventasDetalle.Sum(v => v.SubTotal);

        // Calcular suma total de costos de servicios
       decimal totalCostosServicios = ventasDetalle.SelectMany(v => v.Servicios).Sum(s => s.Costo ?? 0);


        var respuesta = new
        {
            VentasDetalle = ventasDetalle,
            TotalVentas = totalVentas,
            TotalCostosServicios = totalCostosServicios,
            TotalGeneral =totalVentas + totalCostosServicios
        };

        return Ok(respuesta);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.InnerException?.Message ?? ex.Message);
    }
}

    }
}