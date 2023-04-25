using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using SampleMapper.Models.DTOs.Incoming;
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

        [HttpPut("{id}")]//editar 
        public async Task<ActionResult<Cliente>> Update(int id, ClienteDto cliente)
        {
            if (id != cliente.Id) return BadRequest();

            _context.Entry(cliente).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(cliente);
        
        
        
        }





        [HttpDelete("{id}")]
        public async Task<ActionResult<Cliente>> Delete(int id)
        {
            var cliente = _context.Clientes.FirstOrDefault(x => x.Id == id);

            if (cliente == null)
                return NotFound();

            cliente.Eliminado = true;
            await _context.SaveChangesAsync();

            return Ok(cliente);
        }

    

       

     
    }
}