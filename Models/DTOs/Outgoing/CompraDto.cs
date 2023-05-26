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
        public List<DetalleCompraDto>? DetalleCompraDtos { get; set; }

    }
}