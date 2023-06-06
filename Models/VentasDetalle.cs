using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class VentasDetalle
    {
        public int Id { get; set; }
        public int IdVenta { get; set; }
        public int? IdProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal SubTotal { get; set; }
        public decimal? Iva { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Producto? IdProductoNavigation { get; set; }
        public virtual Venta IdVentaNavigation { get; set; } = null!;
    }
}
