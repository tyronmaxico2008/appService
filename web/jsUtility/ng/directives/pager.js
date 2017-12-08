appBll.directive("pager", function (appConfig) {
    return {
        restrict: "E",
        replace: true,
        scope: { grd: "=grd" },
        templateUrl : appConfig.viewLink + "pager.html" ,
        link: function (scope, element, attrs) {
            
        }
    }
});

/*


appBll.directive("pager", function (appConfig) {

    return {
        restrict: "E",
        replace: true,
        scope: { grd: "=grd" },
        templateUrl : "http://localhost/assets/ngUtility2/views/pager.htm",
        link: function (scope, element, attrs) {
        }
    }
});



*/