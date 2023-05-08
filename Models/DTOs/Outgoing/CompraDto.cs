using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class CompraDto
    {
        public int IdProveedor { get; set; }
        public int IdDeposito { get; set; }
        //public DateTime Fecha { get; set; }
        //public decimal Total { get; set; }
        public string? NotasAdicionales { get; set; }
        public decimal Iva { get; set; }
        public List<DetalleCompraDto> DetalleCompraDtos { get; set; }
        //public bool? Eliminado { get; set; }
    }
}