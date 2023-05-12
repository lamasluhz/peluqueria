using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using PeluqueriaWebApi.Models;

namespace PeluqueriaWebApi.Controllers
{
    [Route("[controller]")]
    public class DetalleCompraController : Controller
    {
        private readonly ILogger<DetalleCompraController> _logger;

        private PeluqueriaContext _context;
        public DetalleCompraController(ILogger<DetalleCompraController> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var Result = await _context.DetallesCompras.ToListAsync();
            return Ok(Result);
        }

        

    }
}