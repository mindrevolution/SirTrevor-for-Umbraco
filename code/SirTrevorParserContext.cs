using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SirTrevor.Blocks;
using SirTrevor.Interfaces;
using SirTrevor.Parsers;

namespace SirTrevor {

    public class SirTrevorParserContext {

        private static SirTrevorParserContext _instance;

        private readonly List<IBlockParser> _parsers = new List<IBlockParser>();

        private SirTrevorParserContext() {
            _parsers.Add(new DefaultBlockParser());
        }

        public static SirTrevorParserContext Instance {
            get { return _instance ?? (_instance = new SirTrevorParserContext()); }
        }

        public List<IBlockParser> Parsers {
            get { return _parsers; }
        } 

        public IBlock[] Data { get; private set; }

        public SirTrevorDataValue Parse(string json) {
            return Parse(JsonConvert.DeserializeObject(json) as JObject);
        }

        public SirTrevorDataValue Parse(JObject obj) {

            // Just return NULL if the socified object is NULL
            if (obj == null) return null;

            // Temporary list while we parse the blocks
            List<IBlock> blocks = new List<IBlock>();

            // Get a reference to the "data" array
            JArray data = obj["data"].Value<JArray>();

            // If the SirTrevor JSON is valid, the array
            // will only contain objects
            foreach (JObject block in data) {

                string type = block["type"].Value<string>();
                JObject blockData = block["data"] as JObject;

                IBlock parsed = null;

                // Iterate through the list of parsers
                foreach (var parser in _parsers) {

                    // Attempt to parse the block
                    parsed = parser.Parse(type, block, blockData);

                    // If the block was parsed, it is added to the list of
                    // blocks and we skip remaining parsers for this block 
                    if (parsed != null) {
                        blocks.Add(parsed);
                        break;
                    }

                }

                if (parsed == null) {
                    blocks.Add(new UnknownBlock(type, block, blockData));
                }

            }

            return new SirTrevorDataValue {
                _json = obj,
                Data = blocks.ToArray()
            };

        }

    }

}