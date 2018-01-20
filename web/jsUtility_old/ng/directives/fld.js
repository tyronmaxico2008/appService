
appBll.directive("fld", function (appConfig) {
    /*
    var sHtml = ""
    
    sHtml =  '<div class="form-group"> \n'
    sHtml += '   <label><span ng-bind="fldTitle"></span>&nbsp;<span  ng-show="fldRequired" style="color: red">**</span></label>   \n'
    sHtml += '   <input type="password" ng-if="isIcon()==false && fldType==\'password\'" class="form-control" ng-model="grd.row[fldName]" /> \n'
    sHtml += '   <input type="text" ng-if="isIcon() == false && fldType ==\'text\'" class="form-control"  ng-model="grd.row[fldName]" /> \n'
    sHtml += '   <textarea rows="4" ng-if="isIcon() == false && fldType ==\'multiline\'" class="form-control"  ng-model="grd.row[fldName]"></textarea> \n'
    sHtml += '<drp data="drpData" display-member="{{displayMember}}" value-member="{{valueMember}}" my-model="grd.row[fldName]" ng-if="isIcon() == false && fldType ==\'drp\'" ></drp> \n'
    
    sHtml += '   <div class="input-group" ng-if="isIcon() == true"> \n' 
    sHtml += '       <span class="input-group-addon"><i ng-class="[\'fa\' , fldIcon]"></i></span>  \n'
    sHtml += '       <input type="text" class="form-control" ng-model="grd.row[fldName]" /> \n '
    sHtml += '   </div> \n'
    sHtml += '</div> \n'
    */

    return {
        restrict: "E"
        , replace: true
        , templateUrl :  appConfig.viewLink + "fld.html" 
        , scope: { 
                    grd : "="
                 ,  fldTitle : "@"
                 , fldName :"@"
                 , fldRequired : "=" 
                 , fldIcon : "@" 
                 , fldType : "@"
                 , drpData : "="
                 , displayMember : "@"
                 , valueMember : "@"
                }
        ,controller : function($scope) {
            
            $scope.fldType =($scope.fldType || "") == "" ? "text" : $scope.fldType;
            
            $scope.isType = function(sType) {
                return ($scope.fldType == sType);
            }
        
            $scope.isIcon = function() {
                return ($scope.fldIcon  || "") == "" ? false : true;  
            }
        }
        , link: function (scope, element, attrs) {
            scope.fldType =(scope.fldType || "") == "" ? "text" : scope.fldType;
        }
    }
});


