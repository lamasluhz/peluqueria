using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class DetalleVentaDto
    {
        public int IdProducto { get; set; }
        public int IdTurno { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Iva { get; set; }

    }
}