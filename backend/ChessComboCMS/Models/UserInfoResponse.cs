using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Models
{
    public class UserInfoResponse
    {
        public IList<string> Roles { get; set; } = new List<string>() { "admin" };
        public string Introduction { get; set; } = "Intro";
        public string Avatar { get; set; } = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
        public string Name { get; set; } = "Gospodin Admin";

    }
}
