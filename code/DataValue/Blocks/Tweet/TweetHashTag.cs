using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks.Tweet {

    public class TweetHashTag {

        public string Text { get; private set; }
        public int[] Indices { get; private set; }

        private TweetHashTag() {
            // Hide default constructor
        }

        internal static TweetHashTag Parse(JObject obj) {
            JArray array = obj.GetArray("indices");
            return new TweetHashTag {
                Text = obj.GetString("text"),
                Indices = new[] {
                    array.GetInt32(0),
                    array.GetInt32(1)
                }
            };
        }

    }

}