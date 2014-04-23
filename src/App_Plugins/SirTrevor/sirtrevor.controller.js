angular.module("umbraco").controller("SirTrevor.Controller", ['$scope', 'dialogService', 'assetsService',
    function ($scope, dialogService, assetsService) {

        // - load all selected blocks	
        var assets = [
            "/App_Plugins/SirTrevor/lib/eventable.js",
            "/App_Plugins/SirTrevor/lib/sir-trevor.min.js",
            "/App_Plugins/SirTrevor/formatters/umbraco.min.js"
        ];
        var activeblocktypes = [];
        angular.forEach($scope.model.config.blocktypes, function (item, index) {
            if (item.Selected) {
                if (item.Filename) {
                    assets.push("/App_Plugins/SirTrevor/blocks/" + item.Filename);
                }
                activeblocktypes.push(item.Name);
            }
        });
        //console.log("assets", assets);
        
	assetsService.load(assets)
		.then(function () {
			var editor = new SirTrevor.Editor({
			    el: $(".sir-trevor"),
                // - activate selected block types for this instance
			    blockTypes: activeblocktypes,
			    blockLimit: parseInt($scope.model.config.blockLimit)
		    });

			$scope.$on("formSubmitting", function (e, args) {
				editor.onFormSubmit();
				$scope.model.value = editor.dataStore;
			});
	});

	assetsService.loadCss("/app_plugins/SirTrevor/lib/sir-trevor.css");
	assetsService.loadCss("/app_plugins/SirTrevor/lib/sir-trevor-icons.css");
	assetsService.loadCss("/app_plugins/SirTrevor/umbraco-backend.css");
}]);