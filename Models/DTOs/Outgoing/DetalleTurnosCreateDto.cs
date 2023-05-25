using System;
using System.Collections.Generic;
namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{

public class DetallesCreateTurnoDto
{
    public int IdTipoServicio { get; set; }
     public int IdCliente { get; set; } // Agregamos la propiedad IdCliente
    public int IdPeluquero { get; set; }
    public DateTime? Fecha { get; set; }
    public decimal? DecMonto { get; set; }
    public bool? Eliminado { get; set; }

    public String horaInicio { get; set; }
    public String horaFinalizacion { get; set; }
}


}




