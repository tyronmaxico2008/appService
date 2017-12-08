
function clsAppConfig() {

    this.appName = "";
    this.controllerLink = "";
    this.assetsLink = "";
    this.viewLink = "";
    this.appResourceLink  = "";
    this.getDataLink = function (sPath) {
        return this.controllerLink + "getdataAll?appName=" + this.appName + "&path=" + sPath;
    }

    this.getDataPagingLink = function (sPath
        , pageSize
        , length
        , start) {

        var sLink = this.controllerLink + "getdataPaging?appName=" + this.appName + "&path=" + sPath;
        sLink += "&draw=" + pageSize;
        sLink += "&length=" + length;
        sLink += "&start=" + start;
        return sLink;
    }
    

    this.getUpdateLink = function (sPath) {
        return this.controllerLink + "UpdateModule?appName=" + this.appName + "&path=" + sPath;
    }
    
    this.getReportLink = function (sPath) {
        return this.controllerLink + "setReport?appName=" + this.appName + "&path=" + sPath;
    }    

    this.getReportDownloadLink = function () {
        return this.controllerLink + "downloadSQLReport";
    }
}