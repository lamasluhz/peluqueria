﻿using System;
using System.Collections.Generic;

namespace PeluqueriaWebApi.Models
{
    public partial class Factura
    {
        public Factura()
        {
            MovimientosCajas = new HashSet<MovimientosCaja>();
        }

        public int Id { get; set; }
        public int IdVenta { get; set; }
        public int IdMedioPago { get; set; }
        public DateTime FechaEmision { get; set; }
        public bool? Eliminado { get; set; }
        public string? Estado { get; set; }
        public string? NumeroFactura { get; set; }

        public virtual MediosPago IdMedioPagoNavigation { get; set; } = null!;
        public virtual Venta IdVentaNavigation { get; set; } = null!;
        public virtual ICollection<MovimientosCaja> MovimientosCajas { get; set; }
    }
}
