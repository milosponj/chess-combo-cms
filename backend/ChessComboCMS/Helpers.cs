using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS
{
    public static class Helpers
    {
        //stupid extension method so we always use same string formatting of the date
        public static string ToOurString(this DateTimeOffset date)
        {
            return date.ToString("d");
        }
    }
}
