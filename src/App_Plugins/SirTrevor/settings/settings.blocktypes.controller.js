angular.module("umbraco")
    .controller("SirTrevor.Settings.Blocktypes.Controller", [ '$scope', 'sirtrevorSettingsResource', 
    function ($scope, sirtrevorSettingsResource) {
        
        sirtrevorSettingsResource.getAvailableBlocktypes().then(function (response) {
            $scope.blocktypes = response.data;

            // - existing assigments? Get them over (selected: true/false?)
            if ($scope.model.value !== null && $scope.model.value.length > 0) {
                angular.forEach($scope.blocktypes, function (item, index) {
                    var curmatch = $scope.getItemByName($scope.model.value, item.Name);

                    if (curmatch) {
                        $scope.blocktypes[index].Active = curmatch.Active;
                        $scope.blocktypes[index].Mandatory = curmatch.Mandatory;
                        $scope.blocktypes[index].Limit = curmatch.Limit;
                    }
                });
            }

            // - alright, everything merged
            $scope.model.value = $scope.blocktypes;
        });

        $scope.getItemByName = function (objects, itemName) {
            for (var i = 0; i < objects.length; i += 1) {
                var object = objects[i];

                if (object.Name === itemName) {
                    return object;
                }
            }
        };
    }]);