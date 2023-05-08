using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class TipoProductoDto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = null!;
        public bool Eliminado { get; set; }
    }
}