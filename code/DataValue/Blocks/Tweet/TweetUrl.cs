using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks.Tweet {
    
    public class TweetUrl {

        public string Url { get; private set; }
        public string ExpandedUrl { get; private set; }
        public string DisplayUrl { get; private set; }
        public int[] Indices { get; private set; }

        private TweetUrl() {
            // Hide default constructor
        }

        internal static TweetUrl Parse(JObject obj) {
            JArray array = obj.GetArray("indices");
            return new TweetUrl {
                Url = obj.GetString("url"),
                ExpandedUrl = obj.GetString("expanded_url"),
                DisplayUrl = obj.GetString("display_url"),
                Indices = new[] {
                    array.GetInt32(0),
                    array.GetInt32(1)
                }
            };
        }

    }

}