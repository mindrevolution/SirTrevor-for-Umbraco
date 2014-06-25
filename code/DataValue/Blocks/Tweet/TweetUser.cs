using Newtonsoft.Json.Linq;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.DataValue.Blocks.Tweet {

    public class TweetUser {

        public string ProfileImageUrl { get; private set; }
        public string ProfileImageUrlHttps { get; private set; }
        public string ScreenName { get; private set; }
        public string Name { get; private set; }

        private TweetUser() {
            // Hide default constructor
        }

        internal static TweetUser Parse(JObject obj) {
            return new TweetUser {
                ProfileImageUrl = obj.GetString("profile_image_url"),
                ProfileImageUrlHttps = obj.GetString("profile_image_url_https"),
                ScreenName = obj.GetString("screen_name"),
                Name = obj.GetString("name")
            };
        }

    }
}
