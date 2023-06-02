using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class UsuarioDto2
    {
        public string Correo { get; set; } = null!;
        public string  Clave { get; set; } = null!;
    }
}