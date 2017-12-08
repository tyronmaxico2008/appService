


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