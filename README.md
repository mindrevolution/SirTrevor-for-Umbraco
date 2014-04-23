# SirTrevor for Umbraco
**A SirTrevor editor plugin for Umbraco 7 that integrates.**


![Sir Trevor for Umbraco in action](README.md.res/sirtrevor-for-umbraco-in-action.gif)

Based on [Sir Trevor](http://madebymany.github.io/sir-trevor-js/). From [mindrevolution](http://www.mindrevolution.com) for [Umbraco](http://www.umbraco.org) with love. Maintained by [Marc Stöcker](https://twitter.com/esn303).



## Quick start

This Umbraco plugin package is for Umbraco 7 and the new "Belle UI".

**Features**
- integrates with the Umbraco media library
- integrates with the Umbraco link picker (for external and internal links)
- local links are saved following Umbraco's localLink concept
- [Razor helper](https://github.com/mindrevolution/SirTrevor-for-Umbraco/blob/master/src/App_Code/SirTrevor.cshtml) included to render the markdown (utilizes [MarkdownDeep](https://github.com/toptensoftware/markdowndeep))
- [sample template/view](https://github.com/mindrevolution/SirTrevor-for-Umbraco/blob/master/src/Views/BlocksPage.cshtml) included, showing how to render the Sir Trevor JSON on the frontend
- **NEW** Data type configuration: Allow block types, require block types, limit amount of blocks used (total and per block type)
- **NEW** Auto-Discovery of Sir Trevor block types (.js files) that are placed in /blocks/ subfolder (respecting minified variants)
- **NEW** Multi instance support


### Umbraco package installation
Install the [package](http://our.umbraco.org/projects/backoffice-extensions/sir-trevor) from the Umbraco package repository.

### Manual installation
These steps are required for manual installation:
- add [/App_Plugins/SirTrevor/](https://github.com/mindrevolution/SirTrevor-for-Umbraco/tree/master/src/App_Plugins/SirTrevor) to your website
- also copy over [/App_Code/SirTrevor.cshtml](https://github.com/mindrevolution/SirTrevor-for-Umbraco/blob/master/src/App_Code/SirTrevor.cshtml) and [/App_Code/SirTrevor/](https://github.com/mindrevolution/SirTrevor-for-Umbraco/tree/master/src/App_Code/SirTrevor)
- *optionally* copy the [sample template/view](https://github.com/mindrevolution/SirTrevor-for-Umbraco/blob/master/src/Views/BlocksPage.cshtml) as well

### Customize the image block size
By default a size reduced thumbnail of the image is inserted into the editor. This makes drag and drop for the blocks much easier on many screens, especially wide, hi-res ones. You can remove this limit by tweaking [umbraco-backend.css](https://github.com/mindrevolution/SirTrevor-for-Umbraco/blob/master/App_Plugins/SirTrevor/umbraco-backend.css).

### Extend Sir Trevor
Full documentation for Sir Trevor can be found [here](http://madebymany.github.io/sir-trevor-js/docs.html).




## Updating the Sir Trevor library
In case you want to upgrade your installation to a later Sir Trevor build than this package supports out of the box, the library is located in [App_Plugins/SirTrevor/lib/](https://github.com/mindrevolution/SirTrevor-for-Umbraco/tree/master/App_Plugins/SirTrevor/lib) and can be upgraded easily, no modifications necessary.



## Screenshots

![Screenshot 1](README.md.res/tour01.png)

![Screenshot 2](README.md.res/tour02.png)

![Screenshot 3](README.md.res/tour03.png)

![Screenshot 4](README.md.res/tour04.png)

![Screenshot 4](README.md.res/tour06.png)

![Screenshot 4](README.md.res/tour07.png)

![Screenshot 4](README.md.res/tour08.png)




## Licence

Sir Trevor as well as Sir Trevor for Umbraco is released under the MIT license:
[opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)



## Contributing

This project is open for collaboration. **Fork. Push. Innovate.**
