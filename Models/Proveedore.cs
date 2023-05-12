﻿using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Proveedore
    {
        public Proveedore()
        {
            Compras = new HashSet<Compra>();
            StockProductos = new HashSet<StockProducto>();
        }

        public int Id { get; set; }
        public int IdPersona { get; set; }
        public string NombreEmpresa { get; set; } = null!;
        public bool? Eliminado { get; set; }
        public string? Ruc { get; set; }

        public virtual Persona IdPersonaNavigation { get; set; } = null!;
        public virtual ICollection<Compra> Compras { get; set; }
        public virtual ICollection<StockProducto> StockProductos { get; set; }
    }
}
