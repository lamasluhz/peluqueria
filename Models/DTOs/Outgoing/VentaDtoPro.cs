using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
public class VentaDtoPro
{
    public int IdCliente { get; set; }
    public int IdDeposito { get; set; }
    public int? IdTurno { get; set; }

    public string Total { get; set; }
    public string NotasAdicionales { get; set; }
    // Otras propiedades necesarias
}

}