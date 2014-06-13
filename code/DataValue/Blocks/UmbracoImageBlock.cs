using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Objects;
using Umbraco.Core.Models;

namespace SirTrevor.DataValue.Blocks {
    
    public class UmbracoImageBlock : Block {

        public UmbracoMediaItem Item { get; private set; }

        public IPublishedContent ItemAsPublishedMedia {
            get { return Item == null ? null : Item.ItemAsPublishedMedia; }
        }

        internal UmbracoImageBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Item = new UmbracoMediaItem(data);
        }
    
    }
}