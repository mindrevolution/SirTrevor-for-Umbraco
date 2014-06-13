using Newtonsoft.Json.Linq;

namespace SirTrevor.Interfaces {
    
    public interface IBlockParser {
    
        IBlock Parse(string type, JObject obj, JObject data);
    
    }

}