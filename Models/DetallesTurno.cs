using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class DetallesTurno
    {
        public int Id { get; set; }
        public int IdTurno { get; set; }
        public int IdTipoServicio { get; set; }
        public int IdPeluquero { get; set; }
        public DateTime? Fecha { get; set; }
        public decimal? DecMonto { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Peluquero IdPeluqueroNavigation { get; set; } = null!;
        public virtual TiposServicio IdTipoServicioNavigation { get; set; } = null!;
        public virtual Turno IdTurnoNavigation { get; set; } = null!;
    }
}
