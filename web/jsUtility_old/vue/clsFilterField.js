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

