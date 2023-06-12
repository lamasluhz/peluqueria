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
        public int? IdFactura { get; set; }
        public int? IdFacturaProveedor { get; set; }
        public DateTime FechaMovimiento { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Caja IdCajaNavigation { get; set; } = null!;
        public virtual Factura? IdFacturaNavigation { get; set; }
        public virtual FacturaProveedore? IdFacturaProveedorNavigation { get; set; }
    }
}
