using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models.DTOs.Incoming;
using PeluqueriaWebApi.Models.DTOs.Outgoing;


namespace PeluqueriaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : Controller
    {
        private readonly ILogger<Cliente> _logger;

        private PeluqueriaContext _context;

        public ClienteController(ILogger<Cliente> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> Get()
        {
            var Result = await _context.Clientes.ToListAsync();
            return Ok(Result);
        }

        [HttpGet("getCliente/")]// traer clientes 
        public async Task<ActionResult<List<ClienteDto>>> GetAlter()
        {
            var clientes = await _context.Clientes.ToListAsync();// trae la lista de clientes sql 
            var personas = await _context.Personas.ToListAsync();
            try
            {
                var result = from cl in clientes
                             join per in personas
                             on cl.IdPersona equals per.Id
                             select new ClienteDto()
                             {
                                 Id = cl.Id,
                                 Nombres = per.Nombres,
                                 Apellidos = per.Apellidos,
                                 Correo = per.Correo,
                                 Telefono = per.Telefono,
                                 Direccion = per.Direccion,
                                 Cedula = per.Cedula,
                                 Eliminado = per.Eliminado,
                                 Ruc=cl.Ruc

                             };

                return result != null ? Ok(result.ToList()) : BadRequest("Error");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

 
        [HttpPost("postCliente/")]
        public async Task<ActionResult<ClienteDto>> Post(ClienteDto clienteDto)
        {
            var _persona = new Persona()
            {
                Nombres = clienteDto.Nombres,
                Apellidos = clienteDto.Apellidos,
                Cedula = clienteDto.Cedula,
                Correo = clienteDto.Correo,
                Telefono = clienteDto.Telefono,
                Direccion = clienteDto.Direccion,
                Eliminado = false
            };
            _context.Personas.Add(_persona);
            _context.SaveChanges();

            var _cliente = new Cliente()
            {
                IdPersona = _persona.Id,
                Ruc = clienteDto.Ruc,
                Eliminado = false,
                
            };
            _context.Clientes.Add(_cliente);
            _context.SaveChanges();

            

            await _context.SaveChangesAsync();
            return new CreatedAtRouteResult("GetCliente", new { id = _cliente.Id }, clienteDto);
        }

    //por id 
        [HttpGet("{id}", Name = "GetCliente")]
        public async Task<ActionResult<Cliente>> GetById(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
            {
                return NotFound();
            }
            return cliente;
        }

       // ...

[HttpPut("{id}")] // Editar un cliente
public async Task<ActionResult<Cliente>> Update(int id, ClienteDto clienteDto)
{
    var cliente = await _context.Clientes.FindAsync(id);

    if (cliente == null)
    {
        return NotFound();
    }

    var persona = await _context.Personas.FindAsync(cliente.IdPersona);

    if (persona == null)
    {
        return NotFound();
    }

    persona.Nombres = clienteDto.Nombres;
    persona.Apellidos = clienteDto.Apellidos;
    persona.Cedula = clienteDto.Cedula;
    persona.Correo = clienteDto.Correo;
    persona.Telefono = clienteDto.Telefono;
    persona.Direccion = clienteDto.Direccion;

    cliente.Ruc = clienteDto.Ruc;

    try
    {
        await _context.SaveChangesAsync();
        return Ok(clienteDto);
    }
    catch (Exception e)
    {
        return BadRequest(e);
    }
}



[HttpDelete("{id}")] // Eliminar un cliente y su persona asociada
public async Task<ActionResult> Delete(int id)
{
    var cliente = await _context.Clientes.FindAsync(id);

    if (cliente == null)
    {
        return NotFound();
    }

    var persona = await _context.Personas.FindAsync(cliente.IdPersona);

    if (persona == null)
    {
        return NotFound();
    }

    cliente.Eliminado = true;
    persona.Eliminado = true;

    try
    {
        await _context.SaveChangesAsync();
        return NoContent();
    }
    catch (Exception e)
    {
        return BadRequest(e);
    }
}


     
    }
}