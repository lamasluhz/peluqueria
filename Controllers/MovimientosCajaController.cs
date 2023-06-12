using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Logging;
using PeluqueriaWebApi.Models;
using PeluqueriaWebApi.Models.DTOs.Outgoing;

namespace PeluqueriaWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovimientosCajaController : Controller
    {
        private readonly ILogger<MovimientosCaja> _logger;
        private PeluqueriaContext _context;
        public MovimientosCajaController(ILogger<MovimientosCaja> logger, PeluqueriaContext context)
        {
            _logger = logger;
            _context = context;
        }
     
////////////




    }
}
