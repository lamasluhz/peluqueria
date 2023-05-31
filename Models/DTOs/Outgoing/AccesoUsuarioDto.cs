using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class AccesoUsuarioDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Rol { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public bool Conectado { get; set; }
    }
}