using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class ProductoDto
    {
        public int Id { get; set; }
        public string DescripcionTipoProducto { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal PrecioUnitario { get; set; }
        public string? NotasAdicionales { get; set; }
        public bool? Eliminado { get; set; }
    }
}