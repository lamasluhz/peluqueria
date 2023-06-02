using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models;
using PeluqueriaWebApi.Controllers;
using PeluqueriaWebApi.Models.DTOs.Outgoing;
using BCrypt.Net;
using System.Text;

namespace PeluqueriaWebApi.Controllers
{
    [Route("[controller]")]
    public class UsuarioController : Controller
    {
        private readonly ILogger<UsuarioController> _logger;

        private PeluqueriaContext _context;

        public UsuarioController(ILogger<UsuarioController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Usuario>> Get()
        {
            var usuarios = await _context.Usuarios.ToListAsync();

            return Ok(usuarios);
        }

        [HttpPost]
        public async Task<IActionResult> PostUsuario([FromBody] UsuarioDto usuarioDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string claveEncriptada = HashPassword(usuarioDto.Clave);

            var nuevoUsuario = new Usuario
            {
                Nombre = usuarioDto.Nombre,
                Rol = usuarioDto.Rol,
                Correo = usuarioDto.Correo,
                Clave = claveEncriptada,
                Conectado = false,
                Eliminado = false

            };

            _context.Usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private string HashPassword(string password)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return hashedPassword;
        }


        [HttpPost("VerificarUsuario")]
        public async Task<ActionResult<AccesoUsuarioDto>> VerificarUsuario([FromBody] UsuarioDto2 usuarioDto)
        {
            try
            {
                if (usuarioDto.Clave == null)
                {

                    return BadRequest();
                }
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo.Equals(usuarioDto.Correo));
                if (user == null)
                {
                    return NotFound();
                }

                string inputPassword = usuarioDto.Clave;
                string hashedPassword = user.Clave;

                bool passwordMatches = BCrypt.Net.BCrypt.Verify(inputPassword, hashedPassword);

                if (passwordMatches)
                {
                    user.Conectado = true;
                    await _context.SaveChangesAsync();

                    var usuarioacceso = new AccesoUsuarioDto
                    {
                        Id = user.Id,
                        Nombre = user.Nombre,
                        Rol = user.Rol,
                        Correo = user.Correo,
                        Conectado = user.Conectado
                    };

                    return Ok(usuarioacceso);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("CerrarSesion/{id}")]
        public async Task<IActionResult> UpdateCerrarSesion(int id)
        {
            var user = await _context.Usuarios.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Conectado = false;
            await _context.SaveChangesAsync();

            return Ok();
        }

    }

}