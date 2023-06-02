namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
  public class ProductoServicioDto
    {
         public int? Id { get; set; }
        public string Nombre { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal { get; set; }
    }
}