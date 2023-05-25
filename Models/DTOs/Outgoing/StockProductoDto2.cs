using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class StockProductoDto2
    {

        public int Id { get; set; }
        public string Proveedor { get; set; } = null!;
        public string Nombre { get; set; } = null!;
        public decimal PrecioUnitario { get; set; }
        public string DescripcionTipoProducto { get; set; } = null!;  //tipo de producto dentro de producto
        public int SectorDeposito { get; set; } //Deposito
    }

}
