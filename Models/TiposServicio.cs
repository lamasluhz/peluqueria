using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class TiposServicio
    {
        public int Id { get; set; }
        public string? Tipo { get; set; }
        public string? Descripcion { get; set; }
        public decimal? DecMonto { get; set; }
        public bool? Eliminado { get; set; }
    }
}
