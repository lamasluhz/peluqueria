﻿using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Venta
    {
        public Venta()
        {
            VentasDetalles = new HashSet<VentasDetalle>();
        }

        public int Id { get; set; }
        public int IdCliente { get; set; }
        public int IdDeposito { get; set; }
        public decimal Total { get; set; }
        public string? NotasAdicionales { get; set; }
        public DateTime? Fecha { get; set; }
        public decimal Iva { get; set; }
        public bool? Eliminado { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; } = null!;
        public virtual Deposito IdDepositoNavigation { get; set; } = null!;
        public virtual ICollection<VentasDetalle> VentasDetalles { get; set; }
    }
}
