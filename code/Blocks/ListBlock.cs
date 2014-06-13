﻿using Newtonsoft.Json.Linq;

namespace SirTrevor.Blocks {
    
    public class ListBlock : TextBlock {

        internal ListBlock(string type, JObject obj, JObject data) : base(type, obj, data) {
            // Nothing to do here
        }
    
    }

}