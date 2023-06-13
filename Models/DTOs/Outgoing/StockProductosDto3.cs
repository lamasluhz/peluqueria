using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class StockProductoDto3
    {

        public int IdProveedor { get; set; }
        public int IdDeposito { get; set; }
        public string DescripcionTipoProducto { get; set; }
        public decimal Iva { get; set; }
        public string NombreProducto { get; set; }
        public decimal PrecioUnitario { get; set; }
        public int Cantidad { get; set; }

    }

}
