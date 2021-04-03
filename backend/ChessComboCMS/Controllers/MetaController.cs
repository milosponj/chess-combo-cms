using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetaController : ControllerBase
    {
        private readonly IConfiguration _config;

        public MetaController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet]
        public ActionResult GetMeta()
        {
            return Ok(_config.GetConnectionString("DefaultConnection").Substring(0, 9));
        }
    }
}
