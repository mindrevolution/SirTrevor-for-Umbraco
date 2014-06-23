﻿using Newtonsoft.Json.Linq;

namespace SirTrevor.DataValue.Blocks {
    
    public class OrderedListBlock : TextBlock {

        internal OrderedListBlock(string type, JObject obj, JObject data) : base(type, obj, data) {
            // Nothing to do here
        }
    
    }

}