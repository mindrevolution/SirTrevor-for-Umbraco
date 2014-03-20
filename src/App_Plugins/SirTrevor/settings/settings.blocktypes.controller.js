angular.module("umbraco")
    .controller("SirTrevor.Settings.Blocktypes.Controller", [ '$scope', 'sirtrevorSettingsResource', 
    function ($scope, sirtrevorSettingsResource) {
        sirtrevorSettingsResource.getAvailableBlocktypes().then(function (response) {
            $scope.blocktypes = response.data;
        });

        if (!$scope.model.value) {
            $scope.model.value = [];
        }
        $scope.addblocktype = function (blocktype) {
            if ($scope.model.value.indexOf(blocktype) != -1) return;
            $scope.model.value.push(blocktype);
        };

    }]);

app.directive('checkList', function () {
    return {
        scope: {
            list: '=checkList',
            value: '@'
        },
        link: function (scope, elem, attrs) {
            var handler = function (setup) {
                var checked = elem.prop('checked');
                var index = scope.list.indexOf(scope.value);

                if (checked && index == -1) {
                    if (setup) elem.prop('checked', false);
                    else scope.list.push(scope.value);
                } else if (!checked && index != -1) {
                    if (setup) elem.prop('checked', true);
                    else scope.list.splice(index, 1);
                }
            };

            var setupHandler = handler.bind(null, true);
            var changeHandler = handler.bind(null, false);

            elem.on('change', function () {
                scope.$apply(changeHandler);
            });
            scope.$watch('list', setupHandler, true);
        }
    };
});