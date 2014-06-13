using Newtonsoft.Json.Linq;

namespace SirTrevor.DataValue.Interfaces {

    public interface IBlock {

        JObject Json { get; }

        string Type { get; }
        
        dynamic data { get; }
    
    }

}