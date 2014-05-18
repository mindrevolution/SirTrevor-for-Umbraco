angular.module("umbraco").controller("SirTrevor.Controller", ['$scope', 'dialogService', 'assetsService',
    function ($scope, dialogService, assetsService) {

        var assets = [
            "/App_Plugins/SirTrevor/lib/eventable.js",
            "/App_Plugins/SirTrevor/lib/sir-trevor.min.js",
            "/App_Plugins/SirTrevor/formatters/umbraco.min.js"
        ];

        var activeblocktypes = [];
        var mandatoryblocktypes = [];
        var blocktypeslimits = [];
        angular.forEach($scope.model.config.blocktypes, function (item, index) {
            // - active block types
            if (item.Active) {
                if (item.Filename) {
                    assets.push("/App_Plugins/SirTrevor/blocks/" + item.Filename);
                }
                activeblocktypes.push(item.Name);
            }

            // - mandatory block types
            if (item.Mandatory) {
                mandatoryblocktypes.push(item.Name);
            }

            // - mandatory block types
            if (item.Limit && parseInt(item.Limit) > 0) {
                blocktypeslimits[item.Name] = item.Limit;
            }
        });

        assetsService.load(assets, $scope)
        .then(function () {

			var editor = new SirTrevor.Editor({
			    el: $("#sir-trevor-" + $scope.model.id),
                // - activate selected block types for this instance
			    blockTypes: activeblocktypes,
			    blockLimit: parseInt($scope.model.config.blockLimit),
			    required: mandatoryblocktypes,
			    blockTypeLimits: blocktypeslimits
			});

			$scope.$on("formSubmitting", function (e, args) {
				editor.onFormSubmit();
				$scope.model.value = editor.dataStore;
			});
	});

	assetsService.loadCss("/app_plugins/SirTrevor/lib/sir-trevor.css");
	assetsService.loadCss("/app_plugins/SirTrevor/lib/sir-trevor-icons.css");
	assetsService.loadCss("/app_plugins/SirTrevor/umbraco-backend.min.css");
}]);