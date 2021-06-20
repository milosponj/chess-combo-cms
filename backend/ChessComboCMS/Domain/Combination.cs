using ChessComboCMS.Domain;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChessComboCMS.Domain
{
    public class Combination
    {
        public int Id { get; set; }
        public Game Game { get; set; }
        public int GameId { get; set; }
        public Player Player { get; set; }
        public int PlayerId { get; set; }
        [Column(TypeName = "jsonb")]
        public List<Move> Moves { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
    }
}
