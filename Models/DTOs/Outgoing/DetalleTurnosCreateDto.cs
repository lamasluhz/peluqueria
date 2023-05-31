using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PeluqueriaWebApi.Models.DTOs.Outgoing
{
    public class DetallesCreateTurnoDto
    {
        public List<int> IdsTipoServicio { get; set; } // Lista de IDs de tipo de servicio
        public int IdCliente { get; set; }
        public int IdPeluquero { get; set; }
        
         [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? Fecha { get; set; } 
        public bool? Eliminado { get; set; }
        public string HoraInicio { get; set; }
        public string HoraFinalizacion { get; set; }
        
        public string Estado { get; set; } 

      
    }
}