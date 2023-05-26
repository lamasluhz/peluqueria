namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
public class DetallesTurnoResponseDto
{
    public int Id { get; set; }
    public string Cliente { get; set; }
    public string Peluquero { get; set; }
    public List<ServicioDto> Servicios { get; set; }
    public decimal MontoTotal { get; set; }
    public DateTime Fecha { get; set; } // Nueva propiedad Fecha
    public TimeSpan HoraInicio { get; set; } // Nueva propiedad HoraInicio
    public TimeSpan HoraFinalizacion { get; set; } // Nueva propiedad HoraFinalizacion

}
}
