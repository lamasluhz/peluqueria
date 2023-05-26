using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Turnos = new HashSet<Turno>();
            Venta = new HashSet<Venta>();
        }

        public int Id { get; set; }
        public int IdPersona { get; set; }
        public string? Ruc { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Persona IdPersonaNavigation { get; set; } = null!;
        public virtual ICollection<Turno> Turnos { get; set; }
        public virtual ICollection<Venta> Venta { get; set; }
    }
}
