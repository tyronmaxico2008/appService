import sys
from aj import task

common = {
    "out" : ".\\..\\my-build\\common.js"
    ,"input" : [
        "common\\clsAjaxProcessing.js"
        ,"common\\g.js"
        ,"common\\global.js"
        ,"common\\myAjax.js"
    ]
}

ng = {
    "out" : ".\\..\\my-build\\ngBll.js"
    ,"input" : [
        '.\\..\\my-build\\common.js'
        ,'ng\\ngCommon.js'
        ,'ng\\clsAppConfig.js'
        ,'ng\\bll.js'
        ,'ng\\ngCRUD.js'
        ,'ng\\directives\\pager.js'
        ,'ng\\directives\\sorter.js'
        ,'ng\\directives\\busy.js'
        ,'ng\\directives\\grd-filter.js'
        ,'ng\\directives\\test.js'
        ,'ng\\directives\\drp.js'
        ,'ng\\directives\\fld.js'
        ,'ng\\directives\\file-model.js'
	,'ng\\filters\\shortDisplay.js'
        ,'ng\\commonControllers\\CRUDControllers.js'
    ]
}

vue  = {
    "out" : ".\\..\\my-build\\vueBll.js"
    ,"input" : [
        '.\\..\\my-build\\common.js'
        ,'vue\\clsConfig.js'
        ,'vue\\Common.js'
        ,'vue\\Grid.js'
        ,'vue\\clsFilterField.js'
        ,'vue\\components.js'
    ]
}

task.join_files(common,ng,vue)

print("DOne..........!")



