var toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + obj[key]);
    }
    return p.join('&');
};


function clsPager() {
    this.pageSize = 10;
    this.count = 0;
    this.pageIndex = 1;
    
    this.pageButtons  = [];

    var this1 = this;
    
    var _setTitleForPageButtons = function() {
        debugger;
        for(var i =0; i < this1.pageButtons.length; i++){
            var iPage = this1.pageIndex + i;    
            this1.pageButtons[i].pageIndex = iPage;
            
            if(iPage > this1.getPageCount())
                this1.pageButtons[i].show = false;
        }
    }
    
    
    this.addPageButtons = function(iCount){
        this.pageButtons = [];
        
        for(var i =0; i < iCount; i++) 
            this.pageButtons.push({ pageIndex : 0, show:true });
            
        _setTitleForPageButtons();    

        /*
        for(var i =0; i < iCount; i++)
        {
            
            var iPage = this.pageIndex + i;
            
            var jn = { pageIndex : iPage , show : true  };
            
            if(iPage > this.getPageCount())
                jn.show = false;
            
            this.pageButtons.push(jn);

        }
        */
        
        
    }
    
    
    
    this.getPageCount = function () {
        return Math.ceil(this.count / this.pageSize);
    }
    
    this.setPageIndex = function(iIndex){
        this.pageIndex = iIndex;    
    }
    
    
    this.movePageGroup = function(){
        this.pageIndex += 1;
        _setTitleForPageButtons()
    }
}

function clsAdapter(bll) { 
    this.row = {};
    
    this.getDataPath = "";
    this.primaryKeyField = "";
    this.saveCommand = ""
    this.deleteCommand = "";
    
    this.edit = function(r) {
        
    }
}


function clsGrid(bll) {
    var _pager  = new clsPager();
    
    this.pager = _pager;
    this.rows = [];
    this.filter = {};
    
    
}
