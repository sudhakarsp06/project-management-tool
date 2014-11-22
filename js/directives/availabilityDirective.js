
my_custom_directive.directive('btAvailable', [ 'UserServices','$timeout','$http',function(UserServices,$timeout,$http) {

	var btAvailable = {};
	btAvailable.restrict = 'A';
	btAvailable.scope = {field: '@',tble: '@',message: '=',available:'=',notavailable:'=', id: '@'};
		
	btAvailable.link = function(scope,elem,attr) {
		console.log('linking');
		elem.bind('blur',function() {
			if( elem.val() != '' )  {
				UserServices.lookup({field:scope.field, table:scope.tble, id: scope.id, value:elem.val()}, function(response) { //SuccessCall back
						scope.available =   response.available;
						scope.notavailable =  response.notavailable
						scope.message = response.message;						
					}, function(response) { //Error Call back
					
					});	
				}
		});
	};
	return btAvailable;

}]);

my_custom_directive.directive('btChange', [ 'UserServices','$timeout',function(UserServices,$timeout) {

	var btChange = {};
	btChange.restrict = 'A';
		
	btChange.link = function(scope,elem,attr) {		
		elem.bind('change',function() {
			//if( elem.val() != '' )  {
				console.log('bt change',elem.val());	
				scope.changestatus();
			//}
		});
		
	};
	return btChange;

}]);


my_custom_directive.directive('btTab', [ '$timeout',function($timeout) {

	var btTab = {};
	btTab.restrict = 'A';
	btTab.scope = {tabid: '@',contentid:'@'};	
	btTab.link = function(scope,elem,attr) {		
		elem.bind('click',function(e) {
			console.log('comoing clock');
			e.preventDefault();
			elem.parent().parent().find('li').attr('class','');
			elem.parent().attr('class','active');
			$('#'+scope.contentid+' div.tab-pane').hide();
			$('#'+scope.contentid+' #grouplist_'+scope.tabid).show();	
			$('#'+scope.contentid).find('div.tab-pane').attr('class','tab-pane fade');
			$('#'+scope.contentid+' #grouplist_'+scope.tabid).attr('class','tab-pane fade in active');	
			//}
		});
		
	};
	return btTab;

}]);

my_custom_directive.directive('btToggle', [ function() {

	var btToggle = {};
	btToggle.restrict = 'A';
	btToggle.scope = true;	
	btToggle.link = function(scope,elem,attr) {		
		elem.bind('click',function(e) {			
			e.preventDefault();
			if(attr.toggleid != '' ) {
				var toggle = $('#'+attr.toggleid); 
			} else {
				var toggle =  $('.'+attr.toggleclass);
			}
			
			if(elem.find('span').attr('class') == 'glyphicon glyphicon-chevron-up') {
				elem.find('span').attr('class','glyphicon glyphicon-chevron-down');
				
			} else {
				elem.find('span').attr('class','glyphicon glyphicon-chevron-up');
			}
			toggle.toggle(attr.togglestyle);
			//}
		});
		
	};
	return btToggle;

}]);

my_custom_directive.directive('btChart', [ function() {

	var btChart = {};
	btChart.restrict = 'A';
	btChart.scope = {piedata:'=',pieid:'@'};	
	btChart.link = function(scope,elem,attr) {			
		scope.$watch('piedata',function(newval, oldval) {			
			if(newval != oldval ) {
				
				if(scope.piedata.data != '' ) {
					
					var ctx = document.getElementById(scope.pieid).getContext("2d");
					angular.forEach(scope.piedata.data,function(value,key) {
						console.log('key',key);
						console.log('value',value);
						scope.piedata.data[key].value = parseInt(value.value);
					});
					console.log('scope.piedata.data',scope.piedata.data);
					window.myPie = new Chart(ctx).Doughnut(scope.piedata.data,{animateScale : true});
					window.myPie.generateLegend();
				}
			}
		},true);
		
	};
	return btChart;

}]);



my_custom_directive.directive('btAjaxupload', [ '$timeout','GENERAL_API_URLS','$http',function($timeout,GENERAL_API_URLS,$http) {
	
	var btAjaxupload = {};
	btAjaxupload.restrict = 'A';
	btAjaxupload.scope = true;	
	btAjaxupload.link = function(scope,elem,attr) {	
			console.log('attr',attr);
		//window.onload = function() {
            var dropzone = document.getElementById("dropzone");
			console.log('dropzone',dropzone);
            dropzone.ondragover = dropzone.ondragenter = function(event) {
                event.stopPropagation();
                event.preventDefault();
            }
    
            dropzone.ondrop = function(event) {
                event.stopPropagation();
                event.preventDefault();

                var filesArray = event.dataTransfer.files;
                for (var i=0; i<filesArray.length; i++) {
                    sendFile(filesArray[i]);
                }
            }
			
			function sendFile(file) {
            var uri = GENERAL_API_URLS.uploadattachment+'?id='+attr.tid+'&type='+attr.ttype;
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            
            xhr.open("POST", uri, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Handle response.
                    //alert(xhr.responseText); // handle response.
					//var data=eval("("+xhr.responseText+")") //retrieve result as an JavaScript object
					//console.log('coming');
					scope.$apply(attr.getattachments); 
					
					//FIXME - not the correct way to call the parent scope function
                }
            };
            fd.append('myFile', file);
            // Initiate a multipart/form-data upload
            xhr.send(fd);
	}
        //}	
		
	};
	
	return btAjaxupload;

}]);


my_custom_directive.directive('btDatepicker', [ function() {

	var btToggle = {};
	btToggle.restrict = 'A';
	btToggle.scope = true;	
	btToggle.link = function(scope,elem,attr) {		
		elem.datepicker({ dateFormat: attr.format });		
	};
	return btToggle;

}]);

my_custom_directive.directive('btColorpicker', [ function() {

	var btColorpicker = {};
	btColorpicker.restrict = 'A';
	btColorpicker.scope = {pickerid:'@',colorcode:'='};	
	btColorpicker.link = function(scope,elem,attr) {	
		scope.$watch('colorcode',function(newval, oldval) {
			var color_option = {};
			color_option.preferredFormat =  "hex";
			if(scope.colorcode == '' ) { 
				color_option.color = '#000000'; 
			} else {
				color_option.color = scope.colorcode; 
			}
			$("#"+scope.pickerid).spectrum(color_option);
		});
	};
	return btColorpicker;

}]);

my_custom_directive.directive('btLegend', [ function() {

	var btLegend = {};
	btLegend.restrict = 'E';
	btLegend.scope = {data:'=',title:'@',tasklist:'@',param:'@',projectid:'@'};	
	btLegend.templateUrl =  'templates/utils/legend.html?t=1';
	btLegend.replace = true;
	return btLegend;

}]);

my_custom_directive.directive('btFilter', [ function() {

	var btFilter = {};
	btFilter.restrict = 'A';
	btFilter.scope = true;	
	btFilter.link = function(scope,elem,attr) {	
		elem.find('input[type="checkbox"]').hide();
		
		elem.bind('click',function(e) {	
			e.preventDefault();
			if( elem.find('input[type="checkbox"]').attr('checked') == 'checked' ) {
				elem.find('input[type="checkbox"]').removeAttr('checked');			
			} else {
				elem.find('input[type="checkbox"]').attr('checked',true);			
			}
			scope.$apply(attr.reload); 	
		});
		
	};
	return btFilter;

}]);
