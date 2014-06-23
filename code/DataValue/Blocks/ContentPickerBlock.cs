using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Objects;
using Umbraco.Core.Models;

namespace SirTrevor.DataValue.Blocks {
    
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