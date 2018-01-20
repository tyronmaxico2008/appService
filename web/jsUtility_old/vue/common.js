

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

