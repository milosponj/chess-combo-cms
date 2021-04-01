using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChessComboCMS.Domain
{
    public class Move
    {
        public string Annotation { get; set; }
        public int Number { get; set; }
        public string Remark { get; set; }
        public string Sign { get; set; }
        public string Fen { get; set; }
    }
}
