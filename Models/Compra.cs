using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Compra
    {
        public Compra()
        {
            DetallesCompras = new HashSet<DetallesCompra>();
            FacturaProveedores = new HashSet<FacturaProveedore>();
            MovimientosCajas = new HashSet<MovimientosCaja>();
        }

        public int Id { get; set; }
        public int IdProveedor { get; set; }
        public int IdDeposito { get; set; }
        public decimal Total { get; set; }
        public string? NotasAdicionales { get; set; }
        public decimal Iva { get; set; }
        public bool? Eliminado { get; set; }
        public DateTime? Fecha { get; set; }

        public virtual Deposito IdDepositoNavigation { get; set; } = null!;
        public virtual Proveedore IdProveedorNavigation { get; set; } = null!;
        public virtual ICollection<DetallesCompra> DetallesCompras { get; set; }
        public virtual ICollection<FacturaProveedore> FacturaProveedores { get; set; }
        public virtual ICollection<MovimientosCaja> MovimientosCajas { get; set; }
    }
}
