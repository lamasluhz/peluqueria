using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeluqueriaWebApi.Models
{
    public partial class Turno
    {
        public Turno()
        {
            DetallesTurnos = new HashSet<DetallesTurno>();
        }

        public int Id { get; set; }
        public int IdCliente { get; set; }
         [ForeignKey("IdCliente")]
    public virtual Cliente IdClienteNavigation { get; set; } = null!;
        public DateTime Fecha { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFinalizacion { get; set; }
        public bool? Eliminado { get; set; }

        public virtual ICollection<DetallesTurno> DetallesTurnos { get; set; }
    }
}
