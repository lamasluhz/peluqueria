using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using PeluqueriaWebApi.Models.DTOs.Outgoing;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models.DTOs.Outgoing;
using PeluqueriaWebApi.Models.DTOs.Incoming;

namespace PeluqueriaWebApi.Controllers
{
    [Route("api/[controller]")]
    public class MediosPagosController : Controller
    {
        private readonly ILogger<MediosPago> _logger;
        private PeluqueriaContext _context;

        public MediosPagosController(ILogger<MediosPago> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;

        }

      // GET: api/MediosPagos
[HttpGet]
public async Task<ActionResult<IEnumerable<MedioPagoDto>>> GetMediosPagos()
{
    var mediosPagos = await _context.MediosPagos.ToListAsync();

    var mediosPagosDto = mediosPagos.Select(medioPago => new MedioPagoDto
    {
        Id = medioPago.Id,
        Nombre = medioPago.Descripcion,
        Eliminado = medioPago.Eliminado
    }).ToList();

    return Ok(mediosPagosDto);
}

// GET: api/MediosPagos/5
[HttpGet("{id}")]
public async Task<ActionResult<MedioPagoDto>> GetMedioPago(int id)
{
    var medioPago = await _context.MediosPagos.FindAsync(id);

    if (medioPago == null)
    {
        return NotFound();
    }

    var medioPagoDto = new MedioPagoDto
    {
        Id = medioPago.Id,
        Nombre = medioPago.Descripcion,
        Eliminado = medioPago.Eliminado
    };

    return Ok(medioPagoDto);
}

// POST: api/MediosPagos
[HttpPost]
public async Task<ActionResult<MedioPagoDto>> CreateMedioPago(MedioPagoDto medioPagoDto)
{
    var medioPago = new MediosPago
    {
        Descripcion = medioPagoDto.Nombre,
        Eliminado = false
    };

    _context.MediosPagos.Add(medioPago);
    await _context.SaveChangesAsync();

    medioPagoDto.Id = medioPago.Id;

    return CreatedAtAction("GetMedioPago", new { id = medioPago.Id }, medioPagoDto);
}

// PUT: api/MediosPagos/5
[HttpPut("{id}")]
public async Task<IActionResult> UpdateMedioPago(int id, MedioPagoDto medioPagoDto)
{
    if (id != medioPagoDto.Id)
    {
        return BadRequest();
    }

    var medioPago = await _context.MediosPagos.FindAsync(id);
    if (medioPago == null)
    {
        return NotFound();
    }

    medioPago.Descripcion = medioPagoDto.Nombre;

    await _context.SaveChangesAsync();

    return NoContent();
}

// DELETE: api/MediosPagos/5
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteMedioPago(int id)
{
    var medioPago = await _context.MediosPagos.FindAsync(id);
    if (medioPago == null)
    {
        return NotFound();
    }

    medioPago.Eliminado = true;
    await _context.SaveChangesAsync();

    return NoContent();
}

    }
}