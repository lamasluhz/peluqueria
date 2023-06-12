using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class StockProducto
    {
        public StockProducto()
        {
            FacturaProveedores = new HashSet<FacturaProveedore>();
        }

        public int Id { get; set; }
        public int IdProducto { get; set; }
        public int IdDeposito { get; set; }
        public int Cantidad { get; set; }
        public bool? Eliminado { get; set; }
        public int IdProveedor { get; set; }

        public virtual Deposito IdDepositoNavigation { get; set; } = null!;
        public virtual Producto IdProductoNavigation { get; set; } = null!;
        public virtual Proveedore IdProveedorNavigation { get; set; } = null!;
        public virtual ICollection<FacturaProveedore> FacturaProveedores { get; set; }
    }
}
