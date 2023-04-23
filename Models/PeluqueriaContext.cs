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
        public virtual DbSet<DetallesEspecialidade> DetallesEspecialidades { get; set; } = null!;
        public virtual DbSet<DetallesTurno> DetallesTurnos { get; set; } = null!;
        public virtual DbSet<Especialidade> Especialidades { get; set; } = null!;
        public virtual DbSet<Peluquero> Peluqueros { get; set; } = null!;
        public virtual DbSet<Persona> Personas { get; set; } = null!;
        public virtual DbSet<Proveedore> Proveedores { get; set; } = null!;
        public virtual DbSet<TiposServicio> TiposServicios { get; set; } = null!;
        public virtual DbSet<Turno> Turnos { get; set; } = null!;

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
                    .HasConstraintName("FK__clientes__idPers__6754599E");
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
                    .HasConstraintName("FK__detalles___idEsp__6383C8BA");

                entity.HasOne(d => d.IdPeluqueroNavigation)
                    .WithMany(p => p.DetallesEspecialidades)
                    .HasForeignKey(d => d.IdPeluquero)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detalles___idPel__6477ECF3");
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
                    .HasConstraintName("FK__detallesT__idPel__73BA3083");

                entity.HasOne(d => d.IdTipoServicioNavigation)
                    .WithMany(p => p.DetallesTurnos)
                    .HasForeignKey(d => d.IdTipoServicio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detallesT__idTip__72C60C4A");

                entity.HasOne(d => d.IdTurnoNavigation)
                    .WithMany(p => p.DetallesTurnos)
                    .HasForeignKey(d => d.IdTurno)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__detallesT__idTur__71D1E811");
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
                    .HasConstraintName("FK__peluquero__idPer__60A75C0F");
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

                entity.HasOne(d => d.IdPersonaNavigation)
                    .WithMany(p => p.Proveedores)
                    .HasForeignKey(d => d.IdPersona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__proveedor__idPer__6A30C649");
            });

            modelBuilder.Entity<TiposServicio>(entity =>
            {
                entity.ToTable("tiposServicios");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DecMonto)
                    .HasColumnType("decimal(19, 5)")
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
                    .HasConstraintName("FK__turnos__idClient__6D0D32F4");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
