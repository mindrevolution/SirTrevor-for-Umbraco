//- adds this resource to the umbraco.resources module
angular.module("umbraco.resources").factory("sirtrevorSettingsResource",
    function ($q, $http) {
        // - return a factory object
        return {
            // - call the API controller
            getAvailableBlocktypes: function () {
                return $http.get("SirTrevor/SettingsApi/GetAvailableBlocktypes");
            }
        };
    }
);