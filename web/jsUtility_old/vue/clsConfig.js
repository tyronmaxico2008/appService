
var appName = "ap_mlm"

//var slinkGet = "http://localhost/web_test/Service/
//var slinkControlView = "http://localhost/assets/admin/vueUtility/controlViews/"
//var slinkSQLReport = "http://localhost/web_test/Service/setReport?appName=" + appName + "&path=";
//var slinkSQLReportDownload = "http://localhost/web_test/Service/downloadSQLReport";

function clsConfig() {

    this.appName = "ap_mlm";
    this.serviceLink =  "http://localhost/web_test/Service/";
    this.controlViewLink = "http://localhost/assets/admin/vueUtility/controlViews/";
    
    this.getDataLink = function(sPath ) { 
        return this.serviceLink + "getdataPaging?appName=" + appName + "&path=" + sPath ; 
    }

    this.getUpdateLink = function (sPath) {
        return this.serviceLink + "UpdateModule?appName=" + this.appName + "&path=" + sPath;
    }

    this.getControlViewLink = function(sPath) {
        return this.controlViewLink + sPath
    }
    
    this.getSQLReportLink = function(sPath){
        return this.serviceLink + "setReport?appName=" + appName + "&path=" + sPath;
    }
    
    this.getSQLReportDownloadLink = function(sPath,sFileType){
        return this.serviceLink + "downloadSQLReport?filetype=" + sFileType;
    }
    
    this.getDataPagingLink = function(sPath,iPageIndex,iPageSize){

        var sLink =  this.serviceLink+ "getdataPaging?appName=" + appName + "&path=" + sPath;
        var iRecordStart = iPageIndex * iPageSize;
        
        sLink += "&start=" + iRecordStart + "&length=" + iPageSize;
        
        return sLink;
    }
    
    
    this.submitForm = function(sUrl,jnPost,callBack){
        $.post(sUrl,jnPost,function(data,status){
            if(status == "success"){
                callBack(data,"success");
            }
        });
        
    }
    
    
    this.getDataPaging = function(sPath
    , jnPostData
    , iPageIndex
    , iPageSize
    , callBack){

        debugger;
        var sLink = this.getDataPagingLink(sPath,iPageIndex,iPageSize);

        this.submitForm(sLink,jnPostData,function(data,status){
            if(status == "success"){
                callBack(data,"success");
            }
        });
    }

    this.UpdateModule =  function ( sPath, jnData, func, e) {
        debugger;
        var url = this.getUpdateLink(sPath);
        var oAjaxProcess = new clsAjaxProcessing(e);

        oAjaxProcess.start();

        this.submitForm(url, jnData,function (data) {
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

    
    this.setSQLReport = function(sPath, jnData, func , e) {
        //var url = appConfig.getReportLink(sPath);
        var oAjaxProcess = new clsAjaxProcessing(e);

        oAjaxProcess.start();
        var sUrl = this.getSQLReportLink(sPath);

        $.post(sUrl,jnData,function (data) {
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
    
    

    this.downloadSQLReport = function (sPath,sFileType,jnData,e){
        var self = this;
        
        this.setSQLReport(sPath, jnData, function (status) {
            if(status=="success")
                window.location =  self.getSQLReportDownloadLink(sPath,sFileType);
        }, e);
        
    }
}

var oConfig = new clsConfig();

