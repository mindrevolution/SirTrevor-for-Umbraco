using Newtonsoft.Json.Linq;
using SirTrevor.Objects;
using Umbraco.Core.Models;

namespace SirTrevor.Blocks {
    
    public class ContentPickerBlock : Block {

        public UmbracoContentItem Item { get; private set; }

        public IPublishedContent ItemAsPublishedContent {
            get { return Item == null ? null : Item.ItemAsPublishedContent; }
        }

        internal ContentPickerBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Item = new UmbracoContentItem(data);
        }
    
    }

}