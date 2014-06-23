using System;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json;
using SirTrevor.WebApi;
using Skybrud.Social.Twitter.OAuth;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace SirTrevor.Controllers {

    [JsonOnlyConfiguration]
    [PluginController("SirTrevor"), IsBackOffice]
    public class TwitterController : UmbracoAuthorizedApiController {

        public object GetTweet(long id) {

            TwitterOAuthClient oauth = new TwitterOAuthClient {
                ConsumerKey = "sgJtXh7FoPVrizbTX00G8UnCx",
                ConsumerSecret = "eQpoqMbYgO62FymLDyKridL9rE5kpT7bqfyZ8a2MFnl0xTYvCZ"
            };

            string tweet;

            try {
                tweet = oauth.Statuses.GetTweet(id);
                if (tweet.StartsWith("{\"errors\":")) {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, new {
                        error = "Unable to retrieve tweet."
                    });
                }
            } catch (Exception) {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new {
                    error = "Unable to retrieve tweet."
                });
            }

            return JsonConvert.DeserializeObject(tweet);

        }

    }

}
