namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
  public class FacturaDto
{
    public string NombreCliente { get; set; }
    public string ApellidoCliente { get; set; }
    public DateTime FechaFactura { get; set; }
    public string Estado { get; set; }
    public decimal TotalVenta { get; set; }
}

   
}