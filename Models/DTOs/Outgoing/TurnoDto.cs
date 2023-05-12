using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
   public class TurnoDto
{
      public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public int IdCliente { get; set; } // Agregamos la propiedad IdCliente
    public ClienteDto Cliente { get; set; }
    public string HoraInicio { get; set; }  // cambiar a string
    public string HoraFinalizacion { get; set; }  // cambiar a string
    public bool Eliminado { get; set; }
}

}