using Newtonsoft.Json;

namespace ChessComboCMS.Models
{
    public class LoginRequest
    {
        [JsonProperty("username")]
        public string username { get; set; }
        [JsonProperty("password")]
        public string password { get; set; }
    }
}
