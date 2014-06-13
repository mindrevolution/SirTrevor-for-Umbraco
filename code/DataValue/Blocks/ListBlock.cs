using Newtonsoft.Json.Linq;

namespace SirTrevor.DataValue.Blocks {
    
    public class ListBlock : TextBlock {

        internal ListBlock(string type, JObject obj, JObject data) : base(type, obj, data) {
            // Nothing to do here
        }
    
    }

}