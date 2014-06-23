using Newtonsoft.Json.Linq;

namespace SirTrevor.DataValue.Interfaces {
    
    public interface IBlockParser {
    
        IBlock Parse(string type, JObject obj, JObject data);
    
    }

}