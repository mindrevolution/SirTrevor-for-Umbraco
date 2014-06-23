using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;
using Umbraco.Core.Models;
using Umbraco.Web;

namespace SirTrevor.DataValue.Objects {
    
    public class UmbracoContentItem {
        
        public int Id { get; set; }
        public string Name { get; set; }

        public IPublishedContent ItemAsPublishedContent {
            get { return UmbracoContext.Current.ContentCache.GetById(Id); }
        }

        internal UmbracoContentItem(JObject obj) {
            Id = obj.GetInt32("id");
            Name = obj.GetString("name");
        }

    }

}