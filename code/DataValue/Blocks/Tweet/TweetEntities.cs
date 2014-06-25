using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks.Tweet {

    public class TweetEntities {

        public TweetHashTag[] HashTags { get; private set; }

        public object[] Symbols { get; private set; }

        public TweetUrl[] Urls { get; private set; }

        public TweetUserMention[] Mentions { get; private set; }

        private TweetEntities() {
            // Hide default constructor
        }

        internal static TweetEntities Parse(JObject obj) {
            return new TweetEntities {
                HashTags = obj.GetArray("hashtags", TweetHashTag.Parse),
                Symbols = new object[0],
                Urls = obj.GetArray("urls", TweetUrl.Parse),
                Mentions = obj.GetArray("user_mentions", TweetUserMention.Parse)
            };
        }

    }

}