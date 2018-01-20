appBll.directive("drp", function (bll) {
    // "<button ng-repeat='r in grd.rows' ng-bind='r[displayMember1]'></button>"
    return {
        restrict: "E"
        , template: "<select ng-options='r[valueMember] as  r[displayMember] for r in grd.rows' ng-model='myModel' class='form-control' > </select>"
        , replace:true
        , scope: { data: "=", displayMember: "@", valueMember: "@", myModel: "=" }
        , controller: function ($scope) {
            $scope.grd = null;
            if (angular.isString($scope.data)) {
                var _grd = new ngCRUD(bll, $scope.data, "", "", $scope.value);
                $scope.grd = _grd;
                _grd.loadAll();
            }
            else if (angular.isObject($scope.data))
                $scope.grd = $scope.data;
        }

    };
});
