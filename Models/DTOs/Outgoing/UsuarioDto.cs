using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class UsuarioDto
    {
        public string Nombre { get; set; } = null!;
        public string Rol { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string  Clave { get; set; } = null!;

    }
}