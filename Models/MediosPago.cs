using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class MediosPago
    {
        public MediosPago()
        {
            FacturaProveedores = new HashSet<FacturaProveedore>();
            Facturas = new HashSet<Factura>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; } = null!;
        public bool? Eliminado { get; set; }

        public virtual ICollection<FacturaProveedore> FacturaProveedores { get; set; }
        public virtual ICollection<Factura> Facturas { get; set; }
    }
}
