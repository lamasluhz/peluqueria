using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class EspecialidadDto
    {
        public int Id { get; set; }
        public string Especialidad { get; set; }
        public string Descripcion { get; set; }
        public bool? Eliminado { get; set; }
    }
}