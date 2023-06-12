using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class FacturaProveedore
    {
        public int Id { get; set; }
        public int IdStockProductos { get; set; }
        public int IdMedioPago { get; set; }
        public DateTime FechaEmision { get; set; }
        public string? NumeroFactura { get; set; }
        public bool? Eliminado { get; set; }

        public virtual MediosPago IdMedioPagoNavigation { get; set; } = null!;
        public virtual StockProducto IdStockProductosNavigation { get; set; } = null!;
    }
}
