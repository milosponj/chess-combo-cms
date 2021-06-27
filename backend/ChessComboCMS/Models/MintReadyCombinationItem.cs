using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Models
{
    public class MintReadyCombinationItem
    {
        [JsonProperty("whitePlayerFullName")]
        public string WhitePlayerFullName { get; set; }

        [JsonProperty("blackPlayerFullName")]
        public string BlackPlayerFullName { get; set; }

        [JsonProperty("playerFullName")]
        public string PlayerFullName { get; set; }

        [JsonProperty("birthDate")]
        public string BirthDate { get; set; }

        [JsonProperty("birthPlace")]
        public string BirthPlace { get; set; }

        [JsonProperty("date")]
        public string Date { get; set; }

        [JsonProperty("gameTitle")]
        public string GameTitle { get; set; }
        [JsonProperty("gameVenue")]
        public string GameVenue { get; set; }

        [JsonProperty("moves")]
        public string Moves { get; set; }
    }
}
