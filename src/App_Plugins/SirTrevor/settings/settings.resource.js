//- adds this resource to the umbraco.resources module
angular.module("umbraco.resources").factory("sirtrevorSettingsResource", ['$q', '$http',
    function ($q, $http) {
        // - return a factory object
        return {
            // - call the API controller
            getAvailableBlocktypes: function () {
                return $http.get("backoffice/SirTrevor/SirTrevorSettingsApi/GetAvailableBlocktypes");
            }
        };
    }]
);