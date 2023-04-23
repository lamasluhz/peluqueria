using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Incoming
{
    public class PeluqueroCreationDto
    {
        public int Id { get; set; }
        public int IdPersona { get; set; }
       
    }
}