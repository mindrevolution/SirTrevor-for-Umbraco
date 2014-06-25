using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Blocks;
using SirTrevor.DataValue.Interfaces;

namespace SirTrevor.DataValue.Parsers {
    
    public class DefaultBlockParser : IBlockParser {

        public IBlock Parse(string type, JObject obj, JObject data) {

            switch (type) {
                case "heading": return new HeadingBlock(type, obj, data);
                case "text": return new TextBlock(type, obj, data);
                case "list": return new ListBlock(type, obj, data);
                case "video": return new VideoBlock(type, obj, data);
                case "quote": return new QuoteBlock(type, obj, data);
                case "content_picker": return new ContentPickerBlock(type, obj, data);
                case "gist": return new GistBlock(type, obj, data);
                case "markdown": return new MarkdownBlock(type, obj, data);
                case "ordered_list": return new OrderedListBlock(type, obj, data);
                case "umbraco_image": return new UmbracoImageBlock(type, obj, data);
                case "umbraco_gallery": return new UmbracoGalleryBlock(type, obj, data);
                case "tweet": return new TweetBlock(type, obj, data);
                default: return null;
            }

        }

    }

}