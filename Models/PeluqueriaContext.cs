using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PeluqueriaWebApi.Models
{
    public partial class PeluqueriaContext : DbContext
    {
        public PeluqueriaContext()
        {
        }

        public PeluqueriaContext(DbContextOptions<PeluqueriaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<Compra> Compras { get; set; } = null!;
        public virtual DbSet<Deposito> Depositos { get; set; } = null!;
        public virtual DbSet<DetallesCompra> DetallesCompras { get; set; } = null!;
        public virtual DbSet<DetallesEspecialidade> DetallesEspecialidades { get; set; } = null!;
        public virtual DbSet<DetallesTurno> DetallesTurnos { get; set; } = null!;
        public virtual DbSet<Especialidade> Especialidades { get; set; } = null!;
        public virtual DbSet<Factura> Facturas { get; set; } = null!;
        public virtual DbSet<MediosPago> MediosPagos { get; set; } = null!;
        public virtual DbSet<Peluquero> Peluqueros { get; set; } = null!;
        public virtual DbSet<Persona> Personas { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<Proveedore> Proveedores { get; set; } = null!;
        public virtual DbSet<StockProducto> StockProductos { get; set; } = null!;
        public virtual DbSet<TiposProducto> TiposProductos { get; set; } = null!;
        public virtual DbSet<TiposServicio> TiposServicios { get; set; } = null!;
        public virtual DbSet<Turno> Turnos { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;
        public virtual DbSet<Venta> Ventas { get; set; } = null!;
        public virtual DbSet<VentasDetalle> VentasDetalles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-8KPIBKP5\\SQLEXPRESS;Database=Peluqueria;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("clientes");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");

                entity.Property(e => e.Ruc)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("RUC");

                entity.HasOne(d => d.IdPersonaNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdPersona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__clientes__idPers__5441852A");
            });

            modelBuilder.Entity<Compra>(entity =>
            {
                entity.ToTable("compras");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdDeposito).HasColumnName("idDeposito");

                entity.Property(e => e.IdProveedor).HasColumnName("idProveedor");

                entity.Property(e => e.Iva)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("iva");

                entity.Property(e => e.NotasAdicionales)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("notasAdicionales");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(19, 5)")
                    .HasColumnName("total");

                entity.HasOne(d => d.IdDepositoNavigation)
                    .WithMany(p => p.Compras)
                    .HasForeignKey(d => d.IdDeposito)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__compras__idDepos__68487DD7");

                entity.HasOne(d => d.IdProveedorNavigation)
                    .WithMany(p => p.Compras)
                    .HasForeignKey(d => d.IdProveedor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__compras__idProve__6754599E");
            });

            modelBuilder.Entity<Deposito>(entity =>
            {
                entity.ToTable("depositos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Sector).HasColumnName("sector");
            });

            modelBuilder.Entity<DetallesCompra>(entity =>
            {
                entity.ToTable("detallesCompras");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdCompra).HasColumnName("idCompra");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");

                entity.Property(e => e.Iva)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("iva");

                entity.Property(e => e.PrecioUnitario)
                    .HasColumnType("decimal(19, 5)")
                    .HasColumnName("precioUnitario");

                entity.Property(e => e.SubTotal)
                    .HasColumnType("decimal(19, 5)")
                    .HasColumnName("subTotal");

                entity.HasOne(d => d.IdCompraNavigation)
                    .WithMany(p => p.DetallesCompras)
                    .HasForeignKey(d => d.IdCompra)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detallesC__idCom__6B24EA82");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.DetallesCompras)
                    .HasForeignKey(d => d.IdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detallesC__idPro__6C190EBB");
            });

            modelBuilder.Entity<DetallesEspecialidade>(entity =>
            {
                entity.ToTable("detalles_especialidades");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdEspecialidad).HasColumnName("idEspecialidad");

                entity.Property(e => e.IdPeluquero).HasColumnName("idPeluquero");

                entity.HasOne(d => d.IdEspecialidadNavigation)
                    .WithMany(p => p.DetallesEspecialidades)
                    .HasForeignKey(d => d.IdEspecialidad)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detalles___idEsp__5070F446");

                entity.HasOne(d => d.IdPeluqueroNavigation)
                    .WithMany(p => p.DetallesEspecialidades)
                    .HasForeignKey(d => d.IdPeluquero)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detalles___idPel__5165187F");
            });

            modelBuilder.Entity<DetallesTurno>(entity =>
            {
                entity.ToTable("detallesTurnos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DecMonto)
                    .HasColumnType("decimal(19, 5)")
                    .HasColumnName("decMonto");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.Property(e => e.IdPeluquero).HasColumnName("idPeluquero");

                entity.Property(e => e.IdTipoServicio).HasColumnName("idTipoServicio");

                entity.Property(e => e.IdTurno).HasColumnName("idTurno");

                entity.HasOne(d => d.IdPeluqueroNavigation)
                    .WithMany(p => p.DetallesTurnos)
                    .HasForeignKey(d => d.IdPeluquero)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detallesT__idPel__05D8E0BE");

                entity.HasOne(d => d.IdTipoServicioNavigation)
                    .WithMany(p => p.DetallesTurnos)
                    .HasForeignKey(d => d.IdTipoServicio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detallesT__idTip__04E4BC85");

                entity.HasOne(d => d.IdTurnoNavigation)
                    .WithMany(p => p.DetallesTurnos)
                    .HasForeignKey(d => d.IdTurno)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detallesT__idTur__03F0984C");
            });

            modelBuilder.Entity<Especialidade>(entity =>
            {
                entity.ToTable("especialidades");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Especialidad)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("especialidad");
            });

            modelBuilder.Entity<Factura>(entity =>
            {
                entity.ToTable("facturas");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.FechaEmision)
                    .HasColumnType("date")
                    .HasColumnName("fechaEmision");

                entity.Property(e => e.IdMedioPago).HasColumnName("idMedioPago");

                entity.Property(e => e.IdVenta).HasColumnName("idVenta");

                entity.Property(e => e.NumeroFactura)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("numeroFactura");

                entity.HasOne(d => d.IdMedioPagoNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdMedioPago)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__facturas__idMedi__0B91BA14");

                entity.HasOne(d => d.IdVentaNavigation)
                    .WithMany(p => p.Facturas)
                    .HasForeignKey(d => d.IdVenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__facturas__idVent__0A9D95DB");
            });

            modelBuilder.Entity<MediosPago>(entity =>
            {
                entity.ToTable("mediosPago");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");
            });

            modelBuilder.Entity<Peluquero>(entity =>
            {
                entity.ToTable("peluqueros");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");

                entity.HasOne(d => d.IdPersonaNavigation)
                    .WithMany(p => p.Peluqueros)
                    .HasForeignKey(d => d.IdPersona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__peluquero__idPer__4D94879B");
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.ToTable("personas");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Apellidos)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("apellidos");

                entity.Property(e => e.Cedula)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("cedula");

                entity.Property(e => e.Correo)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("correo");

                entity.Property(e => e.Direccion)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("direccion");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Nombres)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("nombres");

                entity.Property(e => e.Telefono)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("telefono");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.ToTable("productos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdTipoProducto).HasColumnName("idTipoProducto");

                entity.Property(e => e.Iva)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("iva");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.NotasAdicionales)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("notasAdicionales");

                entity.Property(e => e.PrecioUnitario)
                    .HasColumnType("decimal(19, 5)")
                    .HasColumnName("precioUnitario");

                entity.HasOne(d => d.IdTipoProductoNavigation)
                    .WithMany(p => p.Productos)
                    .HasForeignKey(d => d.IdTipoProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__productos__idTip__5DCAEF64");
            });

            modelBuilder.Entity<Proveedore>(entity =>
            {
                entity.ToTable("proveedores");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");

                entity.Property(e => e.NombreEmpresa)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreEmpresa");

                entity.Property(e => e.Ruc)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("ruc");

                entity.HasOne(d => d.IdPersonaNavigation)
                    .WithMany(p => p.Proveedores)
                    .HasForeignKey(d => d.IdPersona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__proveedor__idPer__571DF1D5");
            });

            modelBuilder.Entity<StockProducto>(entity =>
            {
                entity.ToTable("stockProductos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdDeposito).HasColumnName("idDeposito");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");

                entity.Property(e => e.IdProveedor).HasColumnName("idProveedor");

                entity.HasOne(d => d.IdDepositoNavigation)
                    .WithMany(p => p.StockProductos)
                    .HasForeignKey(d => d.IdDeposito)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__stockProd__idDep__6383C8BA");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.StockProductos)
                    .HasForeignKey(d => d.IdProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__stockProd__idPro__628FA481");

                entity.HasOne(d => d.IdProveedorNavigation)
                    .WithMany(p => p.StockProductos)
                    .HasForeignKey(d => d.IdProveedor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__stockProd__idPro__6E01572D");
            });

            modelBuilder.Entity<TiposProducto>(entity =>
            {
                entity.ToTable("tiposProductos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");
            });

            modelBuilder.Entity<TiposServicio>(entity =>
            {
                entity.ToTable("tiposServicios");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DecMonto)
                    .HasColumnType("decimal(19, 0)")
                    .HasColumnName("decMonto");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Tipo)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("tipo");
            });

            modelBuilder.Entity<Turno>(entity =>
            {
                entity.ToTable("turnos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Estado)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("estado");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.Property(e => e.HoraFinalizacion).HasColumnName("horaFinalizacion");

                entity.Property(e => e.HoraInicio).HasColumnName("horaInicio");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Turnos)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__turnos__idClient__01142BA1");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuarios");

                entity.HasIndex(e => e.Correo, "UQ__usuarios__2A586E0B02493C86")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Clave)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("clave");

                entity.Property(e => e.Conectado).HasColumnName("conectado");

                entity.Property(e => e.Correo)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("correo");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.Rol)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("rol");
            });

            modelBuilder.Entity<Venta>(entity =>
            {
                entity.ToTable("ventas");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdDeposito).HasColumnName("idDeposito");

                entity.Property(e => e.IdTurno).HasColumnName("idTurno");

                entity.Property(e => e.Iva)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("iva");

                entity.Property(e => e.NotasAdicionales)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("notasAdicionales");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(10, 5)")
                    .HasColumnName("total");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Venta)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ventas__idClient__74AE54BC");

                entity.HasOne(d => d.IdDepositoNavigation)
                    .WithMany(p => p.Venta)
                    .HasForeignKey(d => d.IdDeposito)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ventas__idDeposi__75A278F5");

                entity.HasOne(d => d.IdTurnoNavigation)
                    .WithMany(p => p.Venta)
                    .HasForeignKey(d => d.IdTurno)
                    .HasConstraintName("FK__ventas__idTurno__07C12930");
            });

            modelBuilder.Entity<VentasDetalle>(entity =>
            {
                entity.ToTable("ventasDetalles");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");

                entity.Property(e => e.IdVenta).HasColumnName("idVenta");

                entity.Property(e => e.Iva)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("iva");

                entity.Property(e => e.PrecioUnitario)
                    .HasColumnType("decimal(19, 5)")
                    .HasColumnName("precioUnitario");

                entity.Property(e => e.SubTotal)
                    .HasColumnType("decimal(19, 5)")
                    .HasColumnName("subTotal");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.VentasDetalles)
                    .HasForeignKey(d => d.IdProducto)
                    .HasConstraintName("FK__ventasDet__idPro__7B5B524B");

                entity.HasOne(d => d.IdVentaNavigation)
                    .WithMany(p => p.VentasDetalles)
                    .HasForeignKey(d => d.IdVenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ventasDet__idVen__7A672E12");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
