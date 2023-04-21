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
        public virtual DbSet<Peluquero> Peluqueros { get; set; } = null!;
        public virtual DbSet<Persona> Personas { get; set; } = null!;
        public virtual DbSet<Proveedore> Proveedores { get; set; } = null!;

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
                    .HasConstraintName("FK__clientes__idPers__4E88ABD4");
            });

            modelBuilder.Entity<Peluquero>(entity =>
            {
                entity.ToTable("peluqueros");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Eliminado).HasColumnName("eliminado");

                entity.Property(e => e.Especialidad)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("especialidad");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");

                entity.HasOne(d => d.IdPersonaNavigation)
                    .WithMany(p => p.Peluqueros)
                    .HasForeignKey(d => d.IdPersona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__peluquero__idPer__4BAC3F29");
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
                    .HasConstraintName("FK__proveedor__idPer__5165187F");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
