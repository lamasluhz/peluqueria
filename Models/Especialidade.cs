using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Especialidade
    {
        public Especialidade()
        {
            DetallesEspecialidades = new HashSet<DetallesEspecialidade>();
        }

        public int Id { get; set; }
        public string Especialidad { get; set; } = null!;
        public string? Descripcion { get; set; }
        public bool? Eliminado { get; set; }

        public virtual ICollection<DetallesEspecialidade> DetallesEspecialidades { get; set; }
    }
}
