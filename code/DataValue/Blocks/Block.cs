using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Interfaces;

namespace SirTrevor.DataValue.Blocks {
    
    public class Block : IBlock {

        /// <summary>
        /// Gets or sets the JObject behind this block.
        /// </summary>
        [JsonIgnore]
        public JObject Json { get; private set; }
        
        /// <summary>
        /// Gets or sets the type of the block.
        /// </summary>
        public string Type { get; private set; }
        
        /// <summary>
        /// Gets a dynamic reference to the "data" object of the block.
        /// </summary>
        [JsonIgnore]
        public dynamic data {
            get { return Json["data"]; }
        }

        protected Block(string type, JObject obj) {
            Json = obj;
            Type = type;
        }
    
    }

}