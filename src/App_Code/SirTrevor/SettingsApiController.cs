using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Umbraco.Web.WebApi;
using Umbraco.Web.Editors;
using Umbraco.Core.Persistence;
using System.Net.Http;
using System.Text.RegularExpressions;

namespace SirTrevor.Settings.Controllers
{

    [Umbraco.Web.Mvc.PluginController("SirTrevor")]
    public class SettingsApiController : UmbracoAuthorizedJsonController
    {
        public SettingsApiController()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        private List<Blocktype> ScanBlocksOnDisk()
        {
            Regex blocknameRegex = new Regex(@"^(.*?)(\bSirTrevor.Blocks.\b)([A-z]*)", RegexOptions.CultureInvariant | RegexOptions.Multiline);
            string blocksroot = "/App_Plugins/SirTrevor/blocks/";
            List<Blocktype> blocktypes = new List<Blocktype>();
            Blocktype bt;

            // - add buildin blocks
            bt = new Blocktype("Heading", "built-in"); blocktypes.Add(bt);
            bt = new Blocktype("Text", "built-in"); blocktypes.Add(bt);
            bt = new Blocktype("List", "built-in"); blocktypes.Add(bt);
            bt = new Blocktype("Quote", "built-in"); blocktypes.Add(bt);
            bt = new Blocktype("Video", "built-in"); blocktypes.Add(bt);

            foreach (string filename in System.IO.Directory.GetFiles(System.Web.HttpContext.Current.Server.MapPath(blocksroot), "*.js"))
            {
                bt = new Blocktype();

                // - get block name from javascript source
                Match m = blocknameRegex.Match(System.IO.File.ReadAllText(filename));
                bt.Name = m.Groups[3].Value;

                bt.Filename = System.IO.Path.GetFileName(filename);

                blocktypes.Add(bt);
            }

            return blocktypes;

        }

        public IEnumerable<Blocktype> GetAvailableBlocktypes()
        {
            // - just return the original list for now
            return ScanBlocksOnDisk();
        }
    }

    public class Blocktype
    {
        public string Name { get; set; }
        public string Filename { get; set; }

        public Blocktype()
        {
        }

        public Blocktype(string name, string filename)
        {
            this.Name = name;
            this.Filename = filename;
        }
    }

}