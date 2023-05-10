using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Producto
    {
        public Producto()
        {
            DetallesCompras = new HashSet<DetallesCompra>();
            StockProductos = new HashSet<StockProducto>();
        }

        public int Id { get; set; }
        public int IdTipoProducto { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal PrecioUnitario { get; set; }
        public string? NotasAdicionales { get; set; }
        public bool? Eliminado { get; set; }
        public decimal? Iva { get; set; }

        public virtual TiposProducto IdTipoProductoNavigation { get; set; } = null!;
        public virtual ICollection<DetallesCompra> DetallesCompras { get; set; }
        public virtual ICollection<StockProducto> StockProductos { get; set; }
    }
}
