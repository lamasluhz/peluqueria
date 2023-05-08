using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Deposito
    {
        public Deposito()
        {
            Compras = new HashSet<Compra>();
            StockProductos = new HashSet<StockProducto>();
        }

        public int Id { get; set; }
        public int Sector { get; set; }
        public string Descripcion { get; set; } = null!;
        public bool? Eliminado { get; set; }

        public virtual ICollection<Compra> Compras { get; set; }
        public virtual ICollection<StockProducto> StockProductos { get; set; }
    }
}
