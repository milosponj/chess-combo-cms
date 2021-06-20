using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Domain
{
    public class Game
    {
        public int Id { get; set; }
        public string PGN { get; set; }
        public DateTimeOffset? Date { get; set; }
        public Player WhitePlayer { get; set; }
        public int? WhitePlayerId { get; set; }
        public Player BlackPlayer { get; set; }
        public int? BlackPlayerId { get; set; }
        public string Description { get; set; }
        public string ChessBaseUrl { get; set; }
        public string Title { get; set; }
        public string Venue { get; set; }
    }
}
