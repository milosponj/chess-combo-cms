using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Models
{
    public class GameListItemResponse
    {
        public int Id { get; set; }
        public DateTimeOffset? Date { get; set; }
        public string WhitePlayerName { get; set; }
        public string BlackPlayerName { get; set; }
        public string Description { get; set; }
    }
}
