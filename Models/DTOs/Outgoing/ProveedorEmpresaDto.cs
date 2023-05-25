using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class ProveedorEmpresaDto
    {
        public int Id { get; set; }
        public string? NombreEmpresa { get; set; }
        public string? Ruc { get; set; }
    }
}