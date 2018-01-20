

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


