using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Factura
    {
        public int Id { get; set; }
        public int IdVenta { get; set; }
        public int IdMedioPago { get; set; }
        public DateTime FechaEmision { get; set; }
        public string NumeroFactura { get; set; } = null!;
        public bool? Eliminado { get; set; }
        public string? Estado { get; set; }

        public virtual MediosPago IdMedioPagoNavigation { get; set; } = null!;
        public virtual Venta IdVentaNavigation { get; set; } = null!;
    }
}
