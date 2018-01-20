
appBll.directive("sorter", function (appConfig) {
    return {
        restrict: "E",
        replace: true,
        scope: { grd: "=grd", col: "@col" },
        templateUrl : appConfig.viewLink + "sorter.htm",
        link: function (scope, element, attrs) {
        }
    }
});
