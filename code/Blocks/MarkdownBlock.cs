using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.Blocks {
    
    public class MarkdownBlock : Block {

        public string Text { get; private set; }

        internal MarkdownBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Text = data.GetString("text");
        }
    
    }

}