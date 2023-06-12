using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Caja
    {
        public int IdCaja { get; set; }
        public DateTime FechaApertura { get; set; }
        public DateTime? FechaCierre { get; set; }
        public TimeSpan? HoraInicial { get; set; }
        public TimeSpan? HoraFinal { get; set; }
        public decimal MontoApertura { get; set; }
        public decimal? MontoCierre { get; set; }
        public string Nombre { get; set; } = null!;
        public string Clave { get; set; } = null!;
        public string Estado { get; set; } = null!;
        public bool? Eliminado { get; set; }
    }
}
