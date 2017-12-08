
var appBll = angular.module("appBll", []);
appBll.factory("appConfig", new clsAppConfig());
appBll.service("bll", function ($http, appConfig) {
    this.getData = function (sPath, callBack) {
        //var sPathFull = "http://localhost:8086/Service/getdata?appName=mailroom&path=" + sPath;
        var sPathFull = appConfig.getDataLink(sPath);
        
        $http.get(sPathFull).success(function (data, status) {
            callBack(data.Obj)
        }).error(function (data, status) {
        });

    }
    
    this.execGrid = function (sPath, pageSize, start, length, jnData, func, e) {
        //alert(event.type);
        
        var oAjaxProcess = new clsAjaxProcessing(e);
        oAjaxProcess.start();

        var _url = appConfig.getDataPagingLink(sPath, pageSize, length, start);

        /*
        var req = {
            method: 'POST',
            url: _url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: toparams(jnData)
        };
        */
        
        this.submitForm(jnData,_url,function (data){
            func(data);
            oAjaxProcess.end();
        });
        
        /*
        $http(req).success(function (data) {
            func(data);
            oAjaxProcess.end();
        });
        */
    }
    
    /*
    this.execGrid = function (sPath, pageSize, start, length, jnData, func, e) {
        //alert(event.type);
        var oAjaxProcess = new clsAjaxProcessing(e);
        oAjaxProcess.start();

        var _url = appConfig.getDataPagingLink(sPath, pageSize, length, start);

        var req = {
            method: 'POST',
            url: _url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: toparams(jnData)
        };
        $http(req).success(function (data) {
            func(data);
            oAjaxProcess.end();
        });
    }
    */
    
    this.execJson = function (sPath, jnData, func,e) {
        //var _url = ng.getLink(sPath);
        var oAjaxProcess = new clsAjaxProcessing(e);
        oAjaxProcess.start();

        var _url = appConfig.getDataLink(sPath);
        /*
        var req = {
            method: 'POST',
            url: _url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: toparams(jnData)
        };
        */
        
        this.submitForm(jnData,_url,function (data){
            func(data)
            oAjaxProcess.end();
        });
        /*
        $http(req).success(function (data) {
            func(data);
        });
        */
    }
    /*
    this.submitForm =  function ( fields, uploadUrl, callback) {

        var fd = new FormData();
        for (var f in fields) {
            if (fields[f] != null && fields[f] != undefined)
                fd.append(f, fields[f]);
        }

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (data) {

            if (callback != undefined) callback(data);
        }).error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            if (callback != undefined) callback("Internal Server Error");
        });
    }

    */
    
    this.submitForm =  function ( fields, uploadUrl, callback) {

        var fd = new FormData();
        for (var f in fields) {
            if (fields[f] != null && fields[f] != undefined)
                fd.append(f, fields[f]);
        }

        var _fnSuccess = function(res){
            if (callback != undefined) callback(res.data,"success");
        }
        var _fnError = function(){
            if (callback != undefined) callback(null,"error");
        };

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(_fnSuccess,_fnError);
        
        /*
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (data) {
            if (callback != undefined) callback(data,"success");
            
        }).error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            if (callback != undefined) callback(null,"error");
        });
        */
    }

    
    this.UpdateModule =  function ( sPath, jnData, func, e) {
            
        var url = appConfig.getUpdateLink(sPath);
        var oAjaxProcess = new clsAjaxProcessing(e);

        oAjaxProcess.start();

        this.submitForm( jnData, url, function (data) {
            var response = data['msg'];
            var data1 = data['data'];

            if (response != "") {
                alert("Opps! "+ response);
                if ($.isFunction(func)) func("error");
            }
            else {
                //ShowMessage("success!", response);
                if ($.isFunction(func)) func("success", data1);
            }
            oAjaxProcess.end();
        });
    }

    this.setSQLReport = function (sPath, jnData, func, e) {
         var url = appConfig.getReportLink(sPath);
         var oAjaxProcess = new clsAjaxProcessing(e);
         
         oAjaxProcess.start();
         this.submitForm(jnData, url, function (data) {
             var response = data['msg'];
             var data1 = data['data'];
             
             if (response != "") {
                 alert(response);
                 if ($.isFunction(func)) func("error");
             }
             else {
                 //ShowMessage("success!", response);
                 if ($.isFunction(func)) func("success", data1);
             }
             
             oAjaxProcess.end();
         });
     }
    
     this.downloadSQLReport = function(sPath,sFileType,jnData,e){
         this.setSQLReport( sPath, jnData, function (status) {
            if(status=="success")
                window.location = appConfig.getReportDownloadLink() + "?filetype=" + sFileType;
        }, e);    
     }
     
     
});

