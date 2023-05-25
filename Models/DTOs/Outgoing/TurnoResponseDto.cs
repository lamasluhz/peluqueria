using PeluqueriaWebApi.Models.DTOs.Outgoing;

public class TurnoResponseDto
{
    public int Id { get; set; }
    public int IdCliente { get; set; }
    public ClienteDto Cliente { get; set; }
    public DateTime Fecha { get; set; }
    public string HoraInicio { get; set; }
    public string HoraFinalizacion { get; set; }
     public bool? Eliminado { get; set; }
}

