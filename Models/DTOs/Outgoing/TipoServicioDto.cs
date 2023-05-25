using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class TipoServicioDto
    {


         public int Id { get; set; }
        public string? Tipo { get; set; }
        public string? Descripcion { get; set; }

        public decimal? DecMonto { get; set; }
        public bool? Eliminado { get; set; }
    }
}