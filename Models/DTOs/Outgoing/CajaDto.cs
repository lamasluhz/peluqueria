using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{public class CajaDto
{
    public int IdCaja { get; set; }
    public string FechaApertura { get; set; }
    public string FechaCierre { get; set; }
    public string HoraInicio { get; set; }
        public string HoraFin { get; set; }
    public decimal MontoApertura { get; set; }
    public decimal? MontoCierre { get; set; }
    public string Nombre { get; set; }
    public string Estado { get; set; }
    public bool? Eliminado { get; set; }
}

}
