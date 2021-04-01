using ChessComboCMS.Domain;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChessComboCMS.Models
{
    public class CreateCombinationRequest
    {
        [Required]
        public int GameId { get; set; }
        [Required]
        public int PlayerId { get; set; }
        [Required]
        public List<Move> Combination { get; set; }
        public string Description { get; set; }
    }
}
