using Newtonsoft.Json.Linq;

namespace SirTrevor.Interfaces {

    public interface IBlock {

        JObject Json { get; }

        string Type { get; }
        
        dynamic data { get; }
    
    }

}