using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models.DTOs.Incoming;
using PeluqueriaWebApi.Models.DTOs.Outgoing;

namespace PeluqueriaWebApi.Controllers
{
    [Route("[controller]")]
    public class DepositoController : Controller
    {
        private readonly ILogger<DepositoController> _logger;

        private PeluqueriaContext _context;

        public DepositoController(PeluqueriaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<DepositoDto>> GetDespositos()
        {
            var depositos = await _context.Depositos.ToListAsync();

            var result = (from d in depositos
                          select new DepositoDto()
                          {
                              Id = d.Id,
                              Descripcion = d.Descripcion,
                              Sector = d.Sector,
                              Eliminado = d.Eliminado
                          }).ToList();

            return result != null ? Ok(result) : BadRequest("Error");
        }

        [HttpPost]
        public async Task<ActionResult<DepositoDto>> PostDeposito(DepositoCreationDto depositoDto)
        {
            var deposito = new Deposito()
            {
                Sector = depositoDto.Sector,
                Descripcion = depositoDto.Descripcion,
                Eliminado = false
            };
            _context.Depositos.Add(deposito);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetDeposito", new { id = deposito.Id }, depositoDto);
        }

        [HttpGet("{id}", Name = "GetDeposito")]
        public async Task<ActionResult<DepositoDto>> GetDeposito(int id)
        {
            var deposito = await _context.Depositos.FindAsync(id);
            if (deposito == null) return NotFound();

            var depositoDto = new DepositoDto()
            {
                Id = deposito.Id,
                Sector = deposito.Sector,
                Descripcion = deposito.Descripcion,
                Eliminado = deposito.Eliminado
            };

            return depositoDto;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<DepositoDto>> UpdateDeposito(int id, DepositoCreationDto depositoDto)
        {
            var deposito = _context.Depositos.FirstOrDefault(a => a.Id == id);

            if (deposito == null) return NotFound();

            deposito.Descripcion = depositoDto.Descripcion;
            deposito.Sector = depositoDto.Sector;
            await _context.SaveChangesAsync();

             var depositoDtoUpdate = new DepositoDto()
            {
                Id = deposito.Id,
                Sector = deposito.Sector,
                Descripcion = deposito.Descripcion,
                Eliminado = deposito.Eliminado
            };

            return Ok(depositoDtoUpdate);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDeposito(int id)
        {
            var deposito = _context.Depositos.FirstOrDefault(a => a.Id == id);

            if (deposito == null) return NotFound();

            deposito.Eliminado = true;
            await _context.SaveChangesAsync();

            return Ok();
        }



    }
}