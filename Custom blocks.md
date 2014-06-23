## Implementing custom blocks (.NET data model)

The package provides a strongly typed model for the block data, and it is possible to add support for custom blocks.

*Implementing a custom block for SoundCloud:*

```C#
using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Blocks;
using SirTrevor.ExtensionMethods;

namespace SirTrevor.SoundCloud {
    
    public class SoundCloudBlock : Block {

        public string Url { get; private set; }

        internal SoundCloudBlock(string type, JObject obj, JObject data) : base(type, obj) {
            Url = data.GetString("url");
        }

    }

}
```

*Implementing a custom parser to handle the SoundCloud block*

```C#
using Newtonsoft.Json.Linq;
using SirTrevor.DataValue.Interfaces;

namespace SirTrevor.SoundCloud {
    
    public class SoundCloudBlockParser : IBlockParser {

        public IBlock Parse(string type, JObject obj, JObject data) {
            switch (type) {
                case "soundcloud": return new SoundCloudBlock(type, obj, data);
                default: return null;
            }
        }

    }

}
```

*And finally registering the custom parser:*

```C#
using SirTrevor.DataValue;
using Umbraco.Core;

namespace SirTrevor.SoundCloud {
    
    public class Startup : ApplicationEventHandler {

        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext) {
            SirTrevorParserContext.Instance.Parsers.Add(new SoundCloudBlockParser());
        }
    
    }

}
```