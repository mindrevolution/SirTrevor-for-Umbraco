using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks {
    
    public class TextBlock : Block {

        public string Text { get; private set; }

        internal TextBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Text = data.GetString("text");
        }
    
    }

}