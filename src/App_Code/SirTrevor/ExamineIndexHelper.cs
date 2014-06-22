using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Umbraco.Core;
using Examine;
using System.IO;
using UmbracoExamine;
using Newtonsoft.Json;

namespace SirTrevor.Examine
{
    class IndexHelper : ApplicationEventHandler
    {
        string propertyEditorKey = "Sir.Trevor";

        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            ExamineManager.Instance.IndexProviderCollection["ExternalIndexer"].GatheringNodeData += ExamineEvents_GatheringNodeData;
        }

        void ExamineEvents_GatheringNodeData(object sender, IndexingNodeDataEventArgs e)
        {
            // - allow on Content, Media, Member as it could be relevant to all on them
            var contentService = Umbraco.Core.ApplicationContext.Current.Services.ContentService;

            try
            {
                var document = contentService.GetById(e.NodeId);

                if (document != null)
                {
                    // - process each doc property
                    foreach (Umbraco.Core.Models.PropertyType proptype in document.ContentType.PropertyTypes)
                    {
                        // - Sir Trevor? Go to work!
                        if (proptype.PropertyEditorAlias == propertyEditorKey)
                        {
                            var val = document.GetValue(proptype.Alias);
                            System.Text.StringBuilder combinedtexts = new System.Text.StringBuilder();

                            if (val != null)
                            {
                                try
                                {
                                    dynamic data = Newtonsoft.Json.JsonConvert.DeserializeObject(e.Fields[proptype.Alias]);
                                    // - object has a data.text property?
                                    if (data != null)
                                    {
                                        for (int i = 0; i < data["data"].Count; i++)
                                        {
                                            var cur = data["data"][i].data;
                                            if (cur != null && cur.Property("text") != null)
                                            {
                                                combinedtexts.Append(cur.Property("text").Value.ToString());
                                            }
                                        }
                                    }

                                    // - just assign combined texts string and let lucene do it's thing ...
                                    e.Fields[proptype.Alias] = combinedtexts.ToString();
                                }
                                catch { }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // - just log it for now
                Umbraco.Core.Logging.LogHelper.Error(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType, ex.Message, ex);
            }
        }
    }
}
