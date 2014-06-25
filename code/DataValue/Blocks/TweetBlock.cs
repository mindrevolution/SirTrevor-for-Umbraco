using System;
using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Blocks.Tweet;
using SirTrevor.ExtensionMethods;
using Skybrud.Social.Twitter;

namespace SirTrevor.DataValue.Blocks {

    public class TweetBlock : Block {
        
        public string Id { get; private set; }
        public string Text { get; private set; }
        public TweetUser User { get; private set; }
        public DateTime CreatedAt { get; set; }
        public string StatusUrl { get; private set; }
        public TweetEntities Entities { get; private set; }

        internal TweetBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Id = data.GetString("id");
            Text = data.GetString("text");
            User = data.GetObject("user", TweetUser.Parse);
            CreatedAt = data.GetString("created_at", TwitterUtils.ParseDateTimeUtc);
            StatusUrl = data.GetString("status_url");
            Entities = data.GetObject("entities", TweetEntities.Parse);
        }
    
    }

}