module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({
		
		concat : {
			options : {
				seprator : ' ' 
			}
		, common : {
			src : [
					'common\\global.js'
				   ,'common\\clsAjaxProcessing.js' 
                    , 'common\\myAjax.js'
			]
			, dest : '.\\..\\jsDemo\\build\\common.js' 
		}
		, ng : { 
			
			src : [
				   'build\\common.js'
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
				   ,'ng\\commonControllers\\CRUDControllers.js'
				  ] 
			 , dest :  '.\\..\\jsDemo\\build\\ngBll.js' 
		   }
		   ,vue : {
			   src : [
					'assets\\admin\\common.js'
					,'assets\\admin\\vueUtility\\clsConfig.js'
					,'assets\\admin\\vueUtility\\Common.js'
					,'assets\\admin\\vueUtility\\Grid.js'
					,'assets\\admin\\vueUtility\\clsFilterField.js'
					,'assets\\admin\\vueUtility\\components.js'
			   ]
			   , dest : ".\\..\\jsDemo\\build\\vueBll.js"
			}
		}
	});

	grunt.registerTask('ng',  ['concat:common','concat:ng']);
	grunt.registerTask('vue', ['concat:common','concat:vue']);
    grunt.registerTask('all', ['concat:common','concat:ng','concat:vue']);
    
}