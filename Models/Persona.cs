using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Persona
    {
        public Persona()
        {
            Clientes = new HashSet<Cliente>();
            Peluqueros = new HashSet<Peluquero>();
            Proveedores = new HashSet<Proveedore>();
        }

        public int Id { get; set; }
        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string? Telefono { get; set; }
        public string? Direccion { get; set; }
        public string Cedula { get; set; } = null!;
        public bool? Eliminado { get; set; }

        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Peluquero> Peluqueros { get; set; }
        public virtual ICollection<Proveedore> Proveedores { get; set; }
    }
}
