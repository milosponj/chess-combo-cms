using ChessComboCMS.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Models
{
    public class CombinationFullDataResponse
    {
        public int Id { get; set; }
        public string WhitePlayerName { get; set; }
        public string OwnerPlayerName { get; set; }
        public string BlackPlayerName { get; set; }
        public string CombinationDescription { get; set; }
        public List<Move> Moves { get; set; }
        public DateTimeOffset? GameDate { get; set; }
        public string GameDescription { get; set; }
        public string GameTitle { get; set; }
        public string GameVenue { get; set; }
        public string GamePGN { get; set; }

        internal static CombinationFullDataResponse FromCombination(Combination combination)
        {
            var retval = new CombinationFullDataResponse()
            {
                Id = combination.Id,
                WhitePlayerName = combination.Game.WhitePlayer.FullName,
                OwnerPlayerName = combination.Player.FullName,
                BlackPlayerName = combination.Game.BlackPlayer.FullName,
                CombinationDescription = combination.Description,
                Moves = combination.Moves,
                GameDate = combination.Game.Date,
                GameDescription = combination.Game.Description,
                GameTitle = combination.Game.Title,
                GameVenue = combination.Game.Venue,
                GamePGN = combination.Game.PGN
            };

            return retval;
        }
    }
}

