using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class MovimientosCaja
    {
        public int IdMovimiento { get; set; }
        public int IdCaja { get; set; }
        public string TipoMovimiento { get; set; } = null!;
        public decimal Monto { get; set; }
        public int IdVenta { get; set; }
        public int IdCompra { get; set; }
        public DateTime FechaMovimiento { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Caja IdCajaNavigation { get; set; } = null!;
        public virtual Compra IdCompraNavigation { get; set; } = null!;
        public virtual Venta IdVentaNavigation { get; set; } = null!;
    }
}
