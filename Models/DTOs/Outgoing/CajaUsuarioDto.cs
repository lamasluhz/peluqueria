using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class CajaUsuarioDto
    {
        public string Nombre { get; set; } = null!;
        public string  Clave { get; set; } = null!;
    }
}