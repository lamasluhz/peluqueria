namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
public class DetallesTurnoUpdateDto
{
    public TimeSpan HoraInicio { get; set; }
    public TimeSpan HoraFinalizacion { get; set; }
    public List<ServicioDto> Servicios { get; set; }
}
}