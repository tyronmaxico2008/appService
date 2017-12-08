function clsFilterField(_grd) {
    //var _grd = ngCRUD("");

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
        this1.fields=[];    
    }

    _grd.addPostJson(function(d){
        debugger;
        if(this1.fields.length > 0)
            d["_filter"] = JSON.stringify(this1.rows);
    });

    _grd['filter']  = this;
    
    if(this.rows.length == 0) this.addRow();
}

appBll.directive("grdFilter", function (appConfig) {
    return {
        restrict: "E",
        replace: true,
        scope: { grd: "=grd" },
        templateUrl : appConfig.viewLink + "grd-filter.html" ,
        link: function (scope, element, attrs) {
        }
    }
});