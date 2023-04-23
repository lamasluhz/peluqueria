using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Incoming
{
    public class EspecialidadesCreationDto
    {
        public string Especialidad { get; set; } = null!;
        public string? Descripcion { get; set; }
    }
}