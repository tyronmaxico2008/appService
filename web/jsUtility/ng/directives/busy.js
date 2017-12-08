
appBll.directive("busy", function () {
    return {
        restrict: "E"
        , replace: true
        , scope: { grd: "=?" }
        , template: function () {
            var sHTML = "";
            return "<div ng-show='grd.busy' style='width:100%'><center><div class='busy-lg'></div></center></div>"
            
            return sHTML;
        }
    }
});