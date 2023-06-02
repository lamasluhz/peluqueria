using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string Clave { get; set; } = null!;
        public bool Conectado { get; set; }
        public bool Eliminado { get; set; }
        public string Rol { get; set; } = null!;
    }
}
