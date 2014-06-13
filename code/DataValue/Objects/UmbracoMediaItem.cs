using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;
using Umbraco.Core.Models;
using Umbraco.Web;

namespace SirTrevor.DataValue.Objects {
    
    public class UmbracoMediaItem {
        
        public int Id { get; set; }
        public string ContentTypeAlias { get; set; }

        public IPublishedContent ItemAsPublishedMedia {
            get { return UmbracoContext.Current.MediaCache.GetById(Id); }
        }

        internal UmbracoMediaItem(JObject obj) {
            Id = obj.GetInt32("id");
            ContentTypeAlias = obj.GetString("contentTypeAlias");
        }

    }

}