using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks {
    
    public class QuoteBlock : Block {

        public string Cite { get; private set; }

        public string Text { get; private set; }

        internal QuoteBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Cite = data.GetString("cite");
            Text = data.GetString("text");
        }
    
    }

}