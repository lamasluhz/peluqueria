namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class FacturaDto
    {

        public int Id { get; set; }
        public int IdVenta { get; set; }

        public decimal Total { get; set; }
        public List<ProductoServicioDto> ProductosServicios { get; set; }
        public int IdMedioPago { get; set; }
        public DateTime? FechaEmision { get; set; }
        public string NumeroFactura { get; set; }

    }
}