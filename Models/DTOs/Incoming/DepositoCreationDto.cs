using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Incoming
{
    public class DepositoCreationDto
    {
        public int Sector { get; set; }
        public string Descripcion { get; set; } = null!;
    }
}