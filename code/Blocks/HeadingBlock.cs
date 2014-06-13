using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.Blocks {

    public class HeadingBlock : Block {

        public string Tag { get; private set; }

        public string Text { get; private set; }

        internal HeadingBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Tag = data.GetString("type") ?? "h1";
            Text = data.GetString("text");
        }
    
    }

}