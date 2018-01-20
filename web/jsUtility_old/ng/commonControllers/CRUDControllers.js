
function getID() {
    return qstr("id");
}
//inheritance of ngCRUD

function clsCRUD_PopUp(bll,oCRUDInfo,sModalDivName){
    
    var _sModalDivName = "#" + (sModalDivName || "divEntry");
    
    var _grd = new ngCRUD(bll,oCRUDInfo['get'],oCRUDInfo['save'],oCRUDInfo['del'],oCRUDInfo['primaryKeyField']);

    _grd.addNew = function(){
        _grd.row = {};
        $(_sModalDivName).modal("show");
    }
    
    _grd.edit1 = function (r) {
        _grd.edit(r);
        $(_sModalDivName).modal("show");
    }

    _grd.addAfterSave(function () {
        $(_sModalDivName).modal("hide");
        _grd.load();
    });
    
    return _grd;
}

function controller_simpleCRUD_popup(sPathGet, sPathSave, sPathDelete, sID) {
    
    var oCRUDInfo = { get: "", save: "", del: "", primaryKeyField: "" }
    
    
    if(angular.isObject(sPathGet))    {
        
        oCRUDInfo.get              = sPathGet["get"];
        oCRUDInfo.save             = sPathGet["save"];
        oCRUDInfo.del              = sPathGet["del"];
        oCRUDInfo.primaryKeyField  = sPathGet['primaryKeyField'];
        
    }
    else if(angular.isString(sPathGet)) {
        oCRUDInfo.get              = sPathGet;
        oCRUDInfo.save             = sPathSave;
        oCRUDInfo.del              = sPathDelete;
        oCRUDInfo.primaryKeyField  = sID;
    }
    else
        throw "Wrong arugment passed for CRUD Information !"

    
    return function ($scope, bll) {
        var _grd = new clsCRUD_PopUp(bll, oCRUDInfo);
        $scope.grd = _grd;
        _grd.load();
        
    }
}

function controller_login(sRedirectLink
    , sBllPathLogin) {
    return function ($scope, bll) {
        $scope.row = { userid: "", pwd: "" };

        $scope.login2 = function (e) {
            if (e.which == 13) $scope.login(e);
        }

        $scope.login = function (e) {
            bll.UpdateModule((sBllPathLogin || "system\\login"), $scope.row, function (status, result) {
                if (status == "success")
                    window.location = sRedirectLink;
            }, e);
        };
    }
}

function controller_simpleCRUD_noPopupEntry(sPathGet, sPathSave, sPathDelete, sID, sPageLink) {
    return function ($scope, bll) {
        var _grd = new ngCRUD(bll, sPathGet, sPathSave, sPathDelete, sID);

        $scope.grd = _grd;
        _grd.addAfterSave(function () {
            window.location = sPageLink + "?id=" + getID();
        });

        if (getID() == "0") {
            _grd.row = {};
        }
        else
            _grd.selectById(getID());

        //End of member
    }
}

function controller_simpleCRUD_noPopupList(sPathGet, sPathSave, sPathDelete, sID, sPageLink) {
    return function ($scope, bll) {
        var _grd = new ngCRUD(bll, sPathGet, sPathSave, sPathDelete, sID);
        $scope.grd = _grd;
        _grd.load();
    }
}
