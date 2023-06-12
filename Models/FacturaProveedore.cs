using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class FacturaProveedore
    {
        public FacturaProveedore()
        {
            MovimientosCajas = new HashSet<MovimientosCaja>();
        }

        public int Id { get; set; }
        public int IdCompra { get; set; }
        public int IdMedioPago { get; set; }
        public DateTime FechaEmision { get; set; }
        public string? NumeroFactura { get; set; }
        public bool? Eliminado { get; set; }
        public string? Estado { get; set; }

        public virtual Compra IdCompraNavigation { get; set; } = null!;
        public virtual MediosPago IdMedioPagoNavigation { get; set; } = null!;
        public virtual ICollection<MovimientosCaja> MovimientosCajas { get; set; }
    }
}
