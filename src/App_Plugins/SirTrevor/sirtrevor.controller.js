angular.module("umbraco").controller("SirTrevor.Controller", ['$scope', 'dialogService', 'assetsService',
    function ($scope, dialogService, assetsService) {
	
	assetsService.load(
			["/App_Plugins/SirTrevor/lib/eventable.js",
			"/App_Plugins/SirTrevor/lib/sir-trevor.min.js",
            "/App_Plugins/SirTrevor/formatters/umbraco.min.js",
			"/App_Plugins/SirTrevor/blocks/umbraco-image.js",
			"/App_Plugins/SirTrevor/blocks/content-picker.js"])
		.then(function () {
		    //$scope.blocktypes = _.where($scope.editorState.preValues, { key: "blocktypes" })[0];
		    console.log("editor config", $scope.model.config);

			var editor = new SirTrevor.Editor({
			    el: $(".sir-trevor"),
			    blockTypes: $scope.model.config.blocktypes
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