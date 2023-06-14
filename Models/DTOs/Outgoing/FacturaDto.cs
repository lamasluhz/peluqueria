namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
public class FacturaDTO
{
    public int Id { get; set; }
    public DateTime FechaEmision { get; set; }
    public string Estado { get; set; }
    public decimal? TotalVenta { get; set; }
    public string NombreCliente { get; set; }
    public string ApellidoCliente { get; set; }
}

   
}