using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace SirTrevor.ExtensionMethods {
    
    public static class HtmlHelperExtensionMethods {

        public static MvcHtmlString SirTrevor(this HtmlHelper helper, object model) {
            return SirTrevor(helper, "Default", model);
        }
        
        public static MvcHtmlString SirTrevor(this HtmlHelper helper, string viewName, object model) {
            return helper.Partial("SirTrevor/" + viewName, model);
        }

    }

}
