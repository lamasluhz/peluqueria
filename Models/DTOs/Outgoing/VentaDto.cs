using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class VentaDto
    {
        public int IdCliente { get; set; }
        //public int IdCaja { get; set; }
        public int IdDeposito { get; set; }
        public List<DetalleVentaDto> DetalleVentaDto { get; set; }
    }
}