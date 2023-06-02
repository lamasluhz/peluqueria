using System;
using System.Collections.Generic;
namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class MedioPagoDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool?  Eliminado { get; set; }
    }
}
