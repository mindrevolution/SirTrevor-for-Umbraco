using System.Linq;
using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Objects;
using Umbraco.Core;
using Umbraco.Core.Models;

namespace SirTrevor.DataValue.Blocks {
    
    public class UmbracoGalleryBlock : Block {

        public UmbracoMediaItem[] Items { get; private set; }

        public IPublishedContent[] ItemsAsPublishedMedia {
            get {
                return (
                    from item in Items
                    select item.ItemAsPublishedMedia
                ).WhereNotNull().ToArray();
            }
        }

        internal UmbracoGalleryBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Items = (
                from JObject child in data.Values()
                select new UmbracoMediaItem(child)
            ).ToArray();
        }
    
    }
}