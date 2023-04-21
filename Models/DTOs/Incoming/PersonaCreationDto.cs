namespace SampleMapper.Models.DTOs.Incoming;
public class PersonaCreationDto
{
     
      
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string? Telefono { get; set; }
        public string? Direccion { get; set; }
        public string Cedula { get; set; } = null!;
       

}