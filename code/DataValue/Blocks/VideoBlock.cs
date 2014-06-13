using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks {
    
    public class VideoBlock : Block {

        public string Source { get; private set; }
        public string RemoteId { get; private set; }

        internal VideoBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Source = data.GetString("source");
            RemoteId = data.GetString("remote_id");
        }
    
    }

}