///amit jha
function clsAjaxProcessing(e) {

    var btn = undefined;

    if (e != undefined)
        if (e.type == "click")
            btn = e.target;

    var elAjaxLoader;

    this.start = function () {

        if (btn != undefined) {
            elAjaxLoader = $('<span class="ajax_in_process" >  &nbsp;&nbsp;&nbsp;&nbsp;</span>');
            $(btn).after(elAjaxLoader);
            $(btn).hide();
        }

    }


    this.end = function () {
        if (btn != undefined) {
            $(btn).show();
            $(elAjaxLoader).remove();
        }
    }
}

var g = {
    alert: function (sMsg, sTitle) {
        alert(sMsg)
    }
};


(function ($) {
    $.fn.serializeAny = function () {
        var ret = [];



        $.each($(this).find(':input'), function () {

            if (this.name != "") {
                var jnData = { name: "", value: "" };
                jnData.name = this.name;
                jnData.value = $(this).val()
                ret.push(jnData);
            }
        });

        return ret;
    };

    $.fn.validateFileSize = function (iSizeInMB) {
        var blnValidate = true;
        $.each(this, function () {
            if (blnValidate == false) return;
            if ($(this).attr("type") == "file" && this.files.length > 0) {
                var sizeInMB = this.files[0].size / 1024 / 1024;


                if (sizeInMB > iSizeInMB) {
                    blnValidate = false;
                    alert("The size of file [" + this.files[0].name + "] is " + sizeInMB.toFixed(2) + " MB, should not exceed more than " + Math.round(iSizeInMB) + " MB");
                }
            }
        });
        return blnValidate;
    };

})(jQuery);


function postJn(sender) {
    var jn = [];

    var f = {
        name: ""
        , value: ""
    };

    f.name = $(sender).prop("name");
    f.value = $(sender).val();

    jn.push(f);

    return jn;

}


function clone(obj1) {
    var mObj = JSON.parse(JSON.stringify(obj1))
    return mObj;
}




function qstr(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



//"http://localhost/web_test/test/test_post"

function clsMyAjax(sUrl) {
    var xhr = new XMLHttpRequest();
    
    var self = this;

    xhr.upload.addEventListener("progress", function(evt){
      if (evt.lengthComputable) {
        //console.log("add upload event-listener" + evt.loaded + "/" + evt.total);
        var iPer = (evt.loaded * 100 ) / evt.total;
        self.onProgress(iPer);
      }
    }, false);
    
    /*
    xhr.onprogress = function (e) {
        debugger;
        if (e.lengthComputable) {
            console.log(e.loaded+  " / " + e.total)
        }
    }
    */
    this.onProgress = function(per){
        console.log(per);
    }
    xhr.onloadstart = function (e) {
        console.log("start")
    }
    xhr.onloadend = function (e) {
        debugger;
        console.log("end")
    } 
    
    
    var file = document.getElementById("txtFile");
    //var fileData = ;
    
    this.send = function(sType,data){
        xhr.open(sType, sUrl);
        xhr.send(data);
    }

    
    this.post = function(oData,callBack){
        self.send("POST",oData);
    }
    
}

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



var arrVueControls = [];

/*
var getDataPaging = oConfig.getDataPaging;

var setSQLReport  = oConfig.setSQLReport;

var  downloadSQLReport = oConfig.downloadSQLReport
*/

function getControlViewHtml(sUrl,callBack){
    _link = oConfig.getControlViewLink(sUrl);
    $.get(_link,function(response,status){
        callBack(response,status);
    })
}

function clsVueControl(sName,sVirtualUrl,fn){
    
    this.name = sName
    this.viewUrl = sVirtualUrl;
    this.fn = fn;
    this.register = function(){
        self = this;
        Vue.component(this.name,function(resolve){
            var jn = self.fn();
            jn.template = "";
            getControlViewHtml(self.viewUrl,function(sHtml){
                jn.template = sHtml;
                resolve(jn);
            });
        });
    }
}

function addVueControl(sName,sUrl,fn){
    var control = new clsVueControl(sName,sUrl,fn);
    arrVueControls.push(control);
}

function registerVueControls() {
    for(var i =0; i < arrVueControls.length;i++){
        arrVueControls[i].register();
    }
}

/*
var dbType = "mssql";

function postData(row) {
	jnPost  = {}
	
	for(var sField in row)
	{
	}
}
*/

function clsGrid (sPathGet,sPathSave,sPathDelete,sID) {

    //CRUD Config
    this.primaryKeyField =  (sID || "id");
    this.getPath = sPathGet;
    this.savePath = sPathSave;
    this.deletePath = sPathDelete;
    //CRUD 	
    
    this.filterData = { }
    this.row = {}
    this.rows  = []
    
    this.count = 0
    this.pageIndex = 0
    this.pageSize = 5
    this.busy = false
    this.isError = false
    this.errorMessage = ""

    this.edit = function (r) {
        this.row = r;
    }

    this.getPageCount = function () {
        return Math.ceil(this.count / this.pageSize);
    }



    this.fill = function(){
        self = this;

        self.busy = true;
        oConfig.getDataPaging(this.getPath,this.filterData,this.pageIndex,this.pageSize,function(res){

            if(res.error == true)
            {
                self.isError = true;
                self.errorMessage = res.error_msg;
            }
            else
            {
                self.isError = false;
                self.errorMessage = "";

                self.rows = res.data;
                self.count = res.recordsTotal;
            }

            self.busy = false;

        });
    }

    this.setPage = function(iPageIndex) {
        debugger;

        //Control start 
        if( (iPageIndex < 0) )
        {
           alert("You are on the first page !");
            return ;
        }
        
        if(iPageIndex >= this.getPageCount()){
            alert("You are on the last page !");
            return ;
        }
        
        //Control end

        this.pageIndex = iPageIndex;
        this.fill();
    }

    this.setPageSize = function(){
        this.pageIndex = 0;
        this.fill();
    }

    this.moveNextPage = function(){
        this.setPage(this.pageIndex + 1);
    }

    this.movePreviousPage = function(){
        this.setPage(this.pageIndex - 1);
    }

    this.moveLastPage = function(){
        this.setPage(this.getPageCount() - 1);
    }

    this.moveFirstPage  = function(){
        this.setPage(0);
    }

    this.search = function(){
        this.pageIndex = 0;
        this.fill();
    }
    
    this.downloadSQLReport = function(sReportName,sType,e){
        oConfig.downloadSQLReport(sReportName, sType, this.filterData, e);    
    }
    
    
    //DML

    this.formClear = function () {
        this.row = { id : 0 };
    }

    this.beforeSave = null;

    this.addBeforeSave = function (fn) {
        grd.beforeSave = fn;
    }

    this.afterSave = null;

    this.addAfterSave = function (fn) {
        this.afterSave = fn;
    }

    
    this.save = function (callback, e) {
        
        var self = this;

        if (this.beforeSave != undefined) {
            if (!this.beforeSave()) return false;
        }
		
		
        oConfig.UpdateModule(this.savePath, self.row, function (status, data, info) {

            if (status == "success") {

                self.formClear();

                if (self.afterSave != undefined && $.isFunction(self.afterSave)) {
                    self.afterSave(data, info);
                }

                if ($.isFunction(callback)) callback(data, info);

            }
            else if (status == "error") {
                //grd.onError(data);
            }
        }, e, false);
    }
}

function clsFilterField(_grd){

    this.fields = [];
    this.rows = [];
    
    var this1 = this;

    this.add = function (sField
        ,sTitle
        ,sFieldType){

        var field = { name : "",title: "",fieldType :"" };

        field.fieldType = (sFieldType || "text");
        field.name = sField;
        field.title = (sTitle || sField || 'Unknown');
        field.operator = "Like";
        this1.fields.push(field);
    }

    this.addRow = function(){

        var jn = { name : "", operator : "LIKE", val : "" };
        if(this1.fields.length > 0 )  jn.name = this1.fields[0].name;
        this1.rows.push(jn);
    }

    this.del = function(iIndex) {
        if(this1.rows.length == 1 ) return;
        this1.rows.splice(iIndex,1);
    }

    this.clear = function(){
        this1.fields = [];
    }

    /*
    _grd.addPostJson(function(d){
        if(this1.fields.length > 0)
    });
    */

    if(this.rows.length == 0) this.addRow();

    this.fill = function(){
        debugger;
        _grd.filterData["_filter"] = JSON.stringify(this.rows);
        _grd.fill();
    }

}




Vue.component("pager",function(resolve) {
    getControlViewHtml("pager.html",function(sHtml,status){
        if(status="success")
        resolve({
            template : sHtml

            ,data : function(){
                return { abc : "amit"};
            }
            ,props :{
                grid : { type : Object   }
            }

        });
    });
});

Vue.component("gridFilter",function(resolve) {
    getControlViewHtml("grid-filter.html",function(sHtml,status){
        if(status="success")
        resolve({
            template : sHtml
            ,data : function(){
                return { };
            }
            , props : {
                grid : { type : Object }
                ,filter : { type: Object , required : true   }
            }
        });
    });
});

Vue.component("busy",{
    props : { grd : Object }
    ,template : "<div v-show='grd.busy' tyle='width:100%'><center><div class='busy-lg'></div></center></div>"
});

/*


addVueControl("pager","pager.html",function(){
    return {
        data : function(){
            return { abc : "amit"};
        }
        , props :{
            grid : { type : Object   }
        }

    };
});

addVueControl("gridFilter","grid-filter.html",function(){
    return {
            data : function(){
                return { };
            }
            , props : {
                grid : { type : Object }
                ,filter : { type: Object , required : true   }
            }
        };
});

*/