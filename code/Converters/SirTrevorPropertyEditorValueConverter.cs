using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace SirTrevor.Converters {

    public class SirTrevorPropertyEditorValueConverter : PropertyValueConverterBase {

        public override bool IsConverter(PublishedPropertyType propertyType) {
            return propertyType.PropertyEditorAlias.Equals("Sir.Trevor");
        }
        
        public override object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview) {
            return SirTrevorParserContext.Instance.Parse(source as string);
        }
    
    }

}