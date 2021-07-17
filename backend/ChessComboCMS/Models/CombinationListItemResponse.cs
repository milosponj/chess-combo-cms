using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Models
{
    public class CombinationListItemResponse
    {
        public int Id { get; set; }
        public string WhitePlayerName { get; set; }
        public string OwnerPlayerName { get; set; }
        public string BlackPlayerName { get; set; }
        public string GameDate { get; set; }
        public string Description { get; set; }
        public int NumberOfMoves { get; set; }
        public string InitialFen { get; set; }
    }
}
