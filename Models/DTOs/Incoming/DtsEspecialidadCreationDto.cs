using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Incoming
{
    public class DtsEspecialidadCreationDto
    {
        public int IdEspecialidad { get; set; }
        public int IdPeluquero { get; set; }
    }
}