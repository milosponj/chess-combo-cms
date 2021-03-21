using ChessComboCMS.Data;
using ChessComboCMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Controllers
{
    [Route("api/[controller]")]
    public class UserController
    {
        private readonly ChessComboCMSContext _context;

        public UserController(ChessComboCMSContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            return new OkObjectResult(new LoginResponse() { Code = 20000, Data = "admin-token" });
        }

        [HttpGet]
        [Route("info")]
        public async Task<ActionResult> GetUserInfo()
        {
            return new OkObjectResult(new UserInfoResponse());
        }
    }
}
