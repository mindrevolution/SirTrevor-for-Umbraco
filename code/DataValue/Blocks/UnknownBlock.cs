using Newtonsoft.Json.Linq;

namespace SirTrevor.DataValue.Blocks {
    
    public class UnknownBlock : Block {

        internal UnknownBlock(string type, JObject obj, JObject data) : base(type, obj) {
            // Nothing to do here
        }
    
    }

}