using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class DetallesCompra
    {
        public int Id { get; set; }
        public int IdCompra { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Iva { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Compra IdCompraNavigation { get; set; } = null!;
        public virtual Producto IdProductoNavigation { get; set; } = null!;
    }
}
