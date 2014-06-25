using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks.Tweet {

    public class TweetUserMention {

        public string ScreenName { get; private set; }
        public string Name { get; private set; }
        public long Id { get; private set; }
        public int[] Indices { get; private set; }

        private TweetUserMention() {
            // Hide default constructor
        }

        internal static TweetUserMention Parse(JObject obj) {
            JArray array = obj.GetArray("indices");
            return new TweetUserMention {
                ScreenName = obj.GetString("screen_name"),
                Name = obj.GetString("name"),
                Id = obj.GetInt64("id"),
                Indices = new[] {
                    array.GetInt32(0),
                    array.GetInt32(1)
                }
            };
        }

    }

}