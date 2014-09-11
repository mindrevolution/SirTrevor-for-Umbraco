using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Umbraco.Core;
using Umbraco.Web.WebApi;

namespace mindrevolution.Controllers
{
    public class FooNode
    {
        public int UmbracoNodeId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string UrlName { get; set; }
        public string Title { get; set; }
    }

    [mindrevolution.WebApi.SimpleJson]
    public class FooController : UmbracoApiController
    {
        /*
        public IEnumerable GetAll()
        {
            List<FooNode> dummy = new List<FooNode>();

            var foo = new FooNode();
            foo.Name = "some name";
            foo.Message="a name=\"google-site-verification\" content=\"vuyO7gCusrY3C5TPZ8zaR043IkIC5LLtLWdts3ZPC0k\" /><meta name=\"msvalidate.01\" content=\"C1CC44B600CAAABE93074D68F34F51F6\" /><meta name=\"p:domain_verify\" content=\"ca16167";
            dummy.Add(foo);

            return dummy;
        }
        */

        public FooNode GetItemMeta(int id)
        {
            Umbraco.Core.Models.IPublishedContent doc = Umbraco.TypedContent(id);
            if (doc!=null)
            {
                var foo = new FooNode();
                foo.UmbracoNodeId = id;
                foo.Name = doc.Name;
                foo.Url = doc.Url;
                foo.UrlName = doc.UrlName;
                foo.Title = "(foo)"; //doc.GetProperty("Title").Value.ToString();

                return foo;
            }

            // TODO ... some kind of more usefull error return
            return null;
        }
    }
}