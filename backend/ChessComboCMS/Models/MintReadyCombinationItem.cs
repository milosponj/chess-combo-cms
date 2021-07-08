using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ChessComboCMS.Models
{
    public class MintReadyCombinationItem
    {
        [JsonPropertyName("cid")]
        public string CmsId { get; set; }
        [JsonPropertyName("whitePlayerFullName")]
        public string WhitePlayerFullName { get; set; }

        [JsonPropertyName("blackPlayerFullName")]
        public string BlackPlayerFullName { get; set; }

        [JsonPropertyName("playerFullName")]
        public string PlayerFullName { get; set; }

        [JsonPropertyName("birthDate")]
        public string BirthDate { get; set; }

        [JsonPropertyName("birthPlace")]
        public string BirthPlace { get; set; }

        [JsonPropertyName("date")]
        public string Date { get; set; }

        [JsonPropertyName("gameTitle")]
        public string GameTitle { get; set; }
        [JsonPropertyName("gameVenue")]
        public string GameVenue { get; set; }

        [JsonPropertyName("moves")]
        public string Moves { get; set; }
    }
}
