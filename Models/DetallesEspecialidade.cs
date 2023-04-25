using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class DetallesEspecialidade
    {
        public int Id { get; set; }
        public int IdEspecialidad { get; set; }
        public int IdPeluquero { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Especialidade IdEspecialidadNavigation { get; set; } = null!;
        public virtual Peluquero IdPeluqueroNavigation { get; set; } = null!;
    }
}
