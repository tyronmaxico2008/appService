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
