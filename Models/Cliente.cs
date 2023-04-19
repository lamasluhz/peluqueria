using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Cliente
    {
        public int Id { get; set; }
        public int IdPersona { get; set; }
        public string? Ruc { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Persona IdPersonaNavigation { get; set; } = null!;
    }
}
