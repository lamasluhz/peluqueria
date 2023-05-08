using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class DetalleCompraDto
    {
        //public int IdCompra { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        //public decimal SubTotal { get; set; }
        public decimal Iva { get; set; }
        //public bool? Eliminado { get; set; }
    }
}