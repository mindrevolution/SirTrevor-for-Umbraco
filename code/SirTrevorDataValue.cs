using Newtonsoft.Json.Linq;
using SirTrevor.Interfaces;

namespace SirTrevor {
    
    public class SirTrevorDataValue {

        internal JObject _json;

        public IBlock[] Data { get; internal set; }

        public dynamic data {
            get { return _json["data"]; }
        }

    }

}