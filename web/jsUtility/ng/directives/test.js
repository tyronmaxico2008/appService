appBll.directive("grdInit", function (bll) {
    return {
        restrict: "A"
        , scope: { grdInit: "@", grdName: "@" }
        , controller: function ($scope) {
            debugger;
            var _grdName = "grd"
            if ($scope.grdName) _grdName = $scope.grdName;
            var _grd = new ngCRUD(bll, $scope.grdInit, "", "", "id");
            $scope.$parent[_grdName] = _grd;
            _grd.load();
        }
        , link: function (scope, element) {
        
        }
    };
});

appBll.directive("appView",function(appConfig,$compile,$templateRequest){
    return {
        restrict : "A"
        , scope : { appView : "=" }
        , link : function(scope, element, attrs)        {
            
            scope.$watch("appView",function(newValue){
                debugger;
                if(newValue){
                    var sUrl = appConfig.appResourceLink +  newValue;    
                    $templateRequest(sUrl).then(function(sHtml){
                        element.html("").append($compile(sHtml)(scope.$parent));
                    });
                }
            });
                    
            //alert(sUrl);
        }
        
    }
});

appBll.filter('appViewUrl', function (appConfig) {
    return function (input) {
        var sUrl = appConfig.appResourceLink + "/" + input;
        return sUrl;
    };
});
