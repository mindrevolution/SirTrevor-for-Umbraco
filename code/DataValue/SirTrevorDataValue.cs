using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Interfaces;

namespace SirTrevor.DataValue {
    
    public class SirTrevorDataValue {

        internal JObject _json;

        public IBlock[] Data { get; internal set; }

        public dynamic data {
            get { return _json["data"]; }
        }

    }

}