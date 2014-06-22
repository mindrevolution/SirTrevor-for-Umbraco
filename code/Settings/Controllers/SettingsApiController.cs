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

    [Umbraco.Web.Mvc.PluginController("SirTrevor"), IsBackOffice]
    public class SettingsApiController : UmbracoAuthorizedJsonController
    {
        public SettingsApiController() {}

        private List<Blocktype> ScanBlocksOnDisk()
        {
            Regex blocknameRegex = new Regex(@"^(.*?)(\bSirTrevor.Blocks.\b)([A-z]*)", RegexOptions.CultureInvariant | RegexOptions.Multiline);
            string blocksroot = "/App_Plugins/SirTrevor/blocks/";
            List<Blocktype> blocktypes = new List<Blocktype>();
            Blocktype bt;

            // - add buildin blocks
            bt = new Blocktype("Heading", null); blocktypes.Add(bt);
            bt = new Blocktype("Text", null); blocktypes.Add(bt);
            bt = new Blocktype("List", null); blocktypes.Add(bt);
            bt = new Blocktype("Quote", null); blocktypes.Add(bt);
            bt = new Blocktype("Video", null); blocktypes.Add(bt);
            bt = new Blocktype("Tweet", null); blocktypes.Add(bt);

            string[] jsfiles = System.IO.Directory.GetFiles(System.Web.HttpContext.Current.Server.MapPath(blocksroot), "*.js", System.IO.SearchOption.TopDirectoryOnly);
            foreach (string filename in jsfiles)
            {
                // - use ".min" variant if existing (and omit non-minified version of the file in that event)
                if (!jsfiles.Contains(filename.Replace(".js",".min.js")))
                {
                    bt = new Blocktype();

                    // - get block name from javascript source
                    Match m = blocknameRegex.Match(System.IO.File.ReadAllText(filename));
                    bt.Name = m.Groups[3].Value;

                    bt.Filename = System.IO.Path.GetFileName(filename);

                    blocktypes.Add(bt);
                }
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
        public bool Active { get; set; }
        public bool Mandatory { get; set; }
        public int Limit { get; set; }

        public Blocktype()
        {
        }

        public Blocktype(string name, string filename, bool active, bool mandatory, int limit)
        {
            this.Name = name;
            this.Filename = filename;
            this.Active = active;
            this.Mandatory = mandatory;
            this.Limit = limit;
        }

        public Blocktype(string name, string filename) : this(name, filename, false, false, 0) {}
        public Blocktype(string name, string filename, bool active) : this(name, filename, active, false, 0) { }
        public Blocktype(string name, string filename, bool active, bool mandatory) : this(name, filename, active, mandatory, 0) { }
    }

}