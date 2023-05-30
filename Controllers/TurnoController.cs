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
    public class TurnoController : Controller
    {
        private readonly ILogger<TurnoController> _logger;
        private PeluqueriaContext _context;
        public TurnoController(ILogger<TurnoController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<TurnoDto>>> Get()
        {
            var turnos = await _context.Turnos
                .Select(t => new TurnoDto
                {
                    Id = t.Id,
                    Fecha = t.Fecha,
                    HoraInicio = t.HoraInicio.ToString("hh\\:mm"),
                    HoraFinalizacion = t.HoraFinalizacion.ToString("hh\\:mm"),
                    IdCliente = t.IdCliente,
                    Cliente = new ClienteDto
                    {
                        Id = t.IdCliente,
                        Nombres = t.IdClienteNavigation.IdPersonaNavigation.Nombres,
                        Apellidos = t.IdClienteNavigation.IdPersonaNavigation.Apellidos,
                        Cedula = t.IdClienteNavigation.IdPersonaNavigation.Cedula,
                        Correo = t.IdClienteNavigation.IdPersonaNavigation.Correo,
                        Telefono = t.IdClienteNavigation.IdPersonaNavigation.Telefono,
                        Direccion = t.IdClienteNavigation.IdPersonaNavigation.Direccion,
                        Ruc = t.IdClienteNavigation.Ruc,
                        Eliminado = false
                    },
                    Estado= "pendiente"
                })
                .ToListAsync();

            return Ok(turnos);
        }





        [HttpPost]
        public async Task<ActionResult<TurnoDto>> CreateTurno(TurnoDto turnoDto)
        {
            // Verificar si el cliente existe en la base de datos
            var cliente = await _context.Clientes.Include(c => c.IdPersonaNavigation)
                                                 .FirstOrDefaultAsync(c => c.Id == turnoDto.IdCliente);
            if (cliente == null)
            {
                return NotFound($"No se encontró el cliente con ID {turnoDto.IdCliente}");
            }

            // Crear una nueva instancia de Turno a partir del DTO
            var turno = new Turno
            {
                IdCliente = turnoDto.IdCliente,
                Fecha = turnoDto.Fecha,
                HoraInicio = TimeSpan.Parse(turnoDto.HoraInicio),
                HoraFinalizacion = TimeSpan.Parse(turnoDto.HoraFinalizacion)
            };

            // Agregar el nuevo turno a la base de datos
            _context.Turnos.Add(turno);
            await _context.SaveChangesAsync();

            // Devolver un objeto TurnoDto que incluya el ID generado
            turnoDto.Id = turno.Id;
            turnoDto.Cliente = new ClienteDto
            {
                Id = cliente.Id,
                Nombres = cliente.IdPersonaNavigation.Nombres,
                Apellidos = cliente.IdPersonaNavigation.Apellidos,
                Cedula = cliente.IdPersonaNavigation.Cedula,
                Correo = cliente.IdPersonaNavigation.Correo,
                Telefono = cliente.IdPersonaNavigation.Telefono,
                Direccion = cliente.IdPersonaNavigation.Direccion,
                Ruc = cliente.Ruc,
                Eliminado = false
            };
            return CreatedAtAction(nameof(Get), new { id = turnoDto.Id }, turnoDto);
        }


    }
}
