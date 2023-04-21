using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Proveedore
    {
        public int Id { get; set; }
        public int IdPersona { get; set; }
        public string NombreEmpresa { get; set; } = null!;
        public bool? Eliminado { get; set; }

        public virtual Persona IdPersonaNavigation { get; set; } = null!;
    }
}
