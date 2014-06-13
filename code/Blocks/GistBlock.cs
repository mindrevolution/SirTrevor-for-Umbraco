using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.Blocks {
    
    public class GistBlock : Block {

        public string Id { get; private set; }

        public string Url {
            get { return "https://gist.github.com/" + Id; }
        }

        internal GistBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Id = data.GetString("id");
        }
    
    }

}