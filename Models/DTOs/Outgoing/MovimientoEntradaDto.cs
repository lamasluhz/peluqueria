using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
public class MovimientoEntradaDto
{
      public int IdCaja { get; set; }
    public decimal Monto { get; set; }
    public int IdFactura { get; set; }
}
}