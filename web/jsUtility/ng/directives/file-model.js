/*
appBll.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
*/

appBll.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            debugger;
            var iSize = (attrs.size || 2);

            element.bind('change', function () {

                if (element.validateFileSize(iSize) == true) {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                }
                else
                    element.val("");
            });
        }
    };
}]);
