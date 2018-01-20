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

