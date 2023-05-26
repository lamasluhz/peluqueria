using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Incoming
{
    public class StockCreationDto
    {
        public int IdProducto { get; set; }
        public int IdDeposito { get; set; }
        public int Cantidad { get; set; }
        public int IdProveedor { get; set; }
    
    }
}