using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Turno
    {
        public Turno()
        {
            DetallesTurnos = new HashSet<DetallesTurno>();
            Venta = new HashSet<Venta>();
        }

        public int Id { get; set; }
        public int IdCliente { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFinalizacion { get; set; }
        public bool? Eliminado { get; set; }
        public string? Estado { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; } = null!;
        public virtual ICollection<DetallesTurno> DetallesTurnos { get; set; }
        public virtual ICollection<Venta> Venta { get; set; }
    }
}
