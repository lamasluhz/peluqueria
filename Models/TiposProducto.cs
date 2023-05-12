using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class TiposProducto
    {
        public TiposProducto()
        {
            Productos = new HashSet<Producto>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; } = null!;
        public bool? Eliminado { get; set; }

        public virtual ICollection<Producto> Productos { get; set; }
    }
}
