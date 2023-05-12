using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class TipoServicio
    {
         public TipoServicio()
        {
            DetallesTurnos = new HashSet<DetallesTurno>();
            Turnos = new HashSet<Turno>();
        }
        public int Id { get; set; }
        public string? Tipo { get; set; }
        public string? Descripcion { get; set; }
        public decimal? DecMonto { get; set; }
        public bool? Eliminado { get; set; }

         public virtual ICollection<DetallesTurno> DetallesTurnos { get; set; }
        public virtual ICollection<Turno> Turnos { get; set; }
    }

    
}
