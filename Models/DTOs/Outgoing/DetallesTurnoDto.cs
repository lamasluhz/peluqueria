using System;
using System.Collections.Generic;
namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{

public class DetallesTurnoDto
{
    public int Id { get; set; }
    public int IdTurno { get; set; }
    public int IdTipoServicio { get; set; }
     public int IdCliente { get; set; }
    public int IdPeluquero { get; set; }
    public DateTime? Fecha { get; set; }
    public decimal? DecMonto { get; set; }
    public bool? Eliminado { get; set; }
    public TimeSpan? HoraInicio { get; set; }
    public TimeSpan? HoraFinalizacion { get; set; }
    public string TipoServicio { get; set; }
    public string ClienteNombre { get; set; }
    public string PeluqueroNombre { get; set; }
    public decimal? CostoServicio { get; set; }
     
    public string Estado { get; set; }
}


}




