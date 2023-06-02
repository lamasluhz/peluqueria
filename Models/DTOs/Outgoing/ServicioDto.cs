namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class ServicioDto
    {
        public int Id { get; set; }
        public string TipoServicio { get; set; }
        public string Descripcion { get; set; }
        public decimal Monto { get; set; }
    }
}
