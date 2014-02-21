angular.module("umbraco").controller("Sir.Trevor.Controller", function ($scope, dialogService, assetsService) {
	
	assetsService.load(
			["/App_Plugins/SirTrevor/lib/eventable.js",
			"/App_Plugins/SirTrevor/lib/sir-trevor.min.js",
            "/App_Plugins/SirTrevor/formatters/umbraco.js",
			"/App_Plugins/SirTrevor/blocks/umbraco-image.js",
			'/App_Plugins/SirTrevor/blocks/content-picker.js'])
		.then(function () {
			var editor = new SirTrevor.Editor({
			el: $(".sir-trevor"),
			blockTypes: [
                "Heading",
				"Text",
				"List",
				"Quote",
				"UmbracoImage",
                "Video",
                "ContentPicker"
			]
		    });

			$scope.$on("formSubmitting", function (e, args) {
				editor.onFormSubmit();
				$scope.model.value = editor.dataStore;
				console.log("editor.dataStore", editor.dataStore);
			});
	});

	assetsService.loadCss("/app_plugins/SirTrevor/lib/sir-trevor.css");
	assetsService.loadCss("/app_plugins/SirTrevor/lib/sir-trevor-icons.css");
	assetsService.loadCss("/app_plugins/SirTrevor/umbraco-backend.css");
});