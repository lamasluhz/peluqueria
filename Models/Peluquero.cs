﻿using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Peluquero
    {
        public Peluquero()
        {
            DetallesEspecialidades = new HashSet<DetallesEspecialidade>();
            DetallesTurnos = new HashSet<DetallesTurno>();
        }

        public int Id { get; set; }
        public int IdPersona { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Persona IdPersonaNavigation { get; set; } = null!;
        public virtual ICollection<DetallesEspecialidade> DetallesEspecialidades { get; set; }
        public virtual ICollection<DetallesTurno> DetallesTurnos { get; set; }
    }
}
