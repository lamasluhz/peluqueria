using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
public class CajaDto
{
    public string Nombre { get; set; }
    public string Clave { get; set; }
    public string HoraInicio { get; set; }
    public string Horafinal { get; set; }
    public DateTime FechaApertura { get; set; }
    public DateTime FechaCierre { get; set; }
     public decimal MontoApertura { get; set; }
     public decimal MontoCierre { get; set; }
    public string Estado { get; set; }
    public bool Eliminado { get; set; }

} 
}
