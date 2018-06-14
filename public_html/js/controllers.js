'use strict';

/* Controllers */

var mouthfulApp = angular.module('mouthfulApp', ['ngSanitize'])

mouthfulApp.controller('mouthfulCtrl', ['$scope', '$http', '$sce',  function($scope, $http, $sce,$event) {
  
   $scope.posts = window.blogPostEntries;//page loads fast without GET
   
  $scope.name = "Mile High Mouthful";
  $scope.orderProp = "postDisplayDate";
  
  $scope.posts = dataEnhance($scope.posts,$scope, $http, $sce);
	
	$scope.posts.paragraphToggle = function(evt) {

		var el = evt.target;
		if (el.nodeName == "SPAN") {
			el = el.parentNode;
		}
		var ps = el.parentNode.querySelectorAll('.paragraphEditArea p');
		
		for (var i=0,len=ps.length;i<len;i++) {
			if (/\s?readMore/.test(ps[i].className)) {
				ps[i].className = ps[i].className.replace(/\s?readMore/,"");
			} else {
				ps[i].className += " readMore";
			}
		}
	}
  

}])
;


mouthfulApp.controller('mouthfulAdminCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  
   $scope.posts = window.blogPostEntries;
   
//   $scope.item = $scope.posts[0];
   
  //$http.get('http://milehighmouthful.com/data/blogposts/data.json').success(function(data) {//$sce doesn't like data from window object//
	
 //$scope.posts = data;
 
  $scope.name = "Mile High Mouthful";
  $scope.orderProp = "postDisplayDate";
  
  $scope.posts = demodataEnhance($scope.posts,$scope, $http, $sce);
  
  
	
	//console.log($scope.stars);
  
  //});
  
  $scope.updateEditAreaContent = function() { 
  
  /*
	*
	* helper functions to toggle between posts for editing
	* 
	*/
	
		
			if ($scope.selectOption == "addNewPost") {
				
				basicGET('add-post-new-post-template.html',(function(data) {
					
						var edit = document.getElementById('editTemplateSwapPlace');
						var elNode = document.createElement('div');
						elNode.className = "editSurface";
						elNode.id = "editTemplateSwapPlace";
						//$(edit).empty();
						
						//edit.parentNode.removeChild(edit);
						
						edit.parentNode.replaceChild(elNode,edit);
						
						$(elNode).append(this.responseText);//jQueary appends to the DOM	
						
						window.assignClicksLocal();
				}));			
				
			} else {
			
			
					
					var posts = $scope.posts;
					
					var post = false;
					//for (var i in posts) {
						
						//if ( posts[i].postTitle == $scope.selectOption) {
						var i = $scope.selectOption;
						if (i) {
							
							window.blogPostForEditTemplate = posts[i];
					 $http.get('add-post-edit-template.html').success(function(data) {//$sce doesn't like data 
							//basicGET('add-post-edit-template.html',(function(data) {
								var edit = document.getElementById('editTemplateSwapPlace');
								
								var elNode = document.createElement('div');
								elNode.className = "editSurface";
								elNode.id = "editTemplateSwapPlace";
								//$(edit).empty();
								var p = edit.parentNode;
								p.replaceChild(elNode,edit);
								//edit.parentNode.removeChild(edit);
								
								delete(p.edit);
								
								$(elNode).append(data);
								//$(elNode).append(this.responseText);//jQueary appends to the DOM
								//this is required for angular						
								
								
								/*--how to use a directive --
								'<div test-directive/>' 
								--add this element and will work with directive on the
								admin contorler
								*/
		
						
								angular.bootstrap(elNode,['mouthfulEditPostApp']);
								window.assignClicksLocal();
								
							});
						//break;	
					//}
				}
				
			
			} //end else if
				//cmsAdmin()//reload the CMS so the JS works;
		
	
	
};
}])


function dataEnhance(dataObj,$scope, $http, $sce) {
	  
	  
   
	for (var x in dataObj) {
		(function() {
		for (var z in dataObj[x]) {
			var html = "";
			switch (z) {
				case "emojiMouthfulBlurgs" :
					var emoji = dataObj[x][z];
					dataObj[x][z] = function() {
						return $sce.trustAsHtml(emoji);
					}
					dataObj[x][z].bind(emoji);
					break;
				case "heartsSelected" :
				
					var hearts = dataObj[x][z];
					dataObj[x][z] = function() {
						return $sce.trustAsHtml(hearts);
					}
					dataObj[x][z].bind(hearts);
					break;
					
				case "paragraphSingleArea" :
					var psa = dataObj[x][z];
					dataObj[x][z] = function() {
						return $sce.trustAsHtml(psa);
					}
					dataObj[x][z].bind(psa);
					break;
				case "docURLs" :
					if (dataObj[x][z]) {
						var img = "";
						for (var i=0,len=dataObj[x][z].length;i<len;i++) {
							var cl = "col1"+"-"+len;
							img += '<img src="'+dataObj[x][z][i]+'" class="'+cl+'" alt="">';
						}
						dataObj[x][z] = function() {
							return $sce.trustAsHtml(img);
						}
						dataObj[x][z].bind(img);
					}
					break;
			}
		}	
			}
			
			)();
	}
	return dataObj;
  }
  
  
  
  
function demodataEnhance(dataObj,$scope, $http, $sce) {
	  
	  
   
	for (var x in dataObj) {
		(function() {
		for (var z in dataObj[x]) {
			var html = "";
			switch (z) {
				case "emojiMouthfulBlurgs" :
					var emoji = dataObj[x][z];
					dataObj[x][z] = function() {
						return $sce.trustAsHtml(emoji);
					}
					dataObj[x][z].bind(emoji);
					break;
				case "heartsSelected" :
				
					var hearts = dataObj[x][z];
					dataObj[x][z] = function() {
						return $sce.trustAsHtml(hearts);
					}
					dataObj[x][z].bind(hearts);
					break;
					
				case "paragraphSingleArea" :
					var psa = dataObj[x][z];
					dataObj[x][z] = function() {
						return $sce.trustAsHtml(psa);
					}
					dataObj[x][z].bind(psa);
					break;
				case "docURLs" :
					if (dataObj[x][z]) {
						var img = "";
						for (var i=0,len=dataObj[x][z].length;i<len;i++) {
							var cl = "col1"+"-"+len;
							img += '<img src="../'+dataObj[x][z][i]+'" class="'+cl+'" alt="">';
						}
						dataObj[x][z] = function() {
							return $sce.trustAsHtml(img);
						}
						dataObj[x][z].bind(img);
					}
					break;
			}
		}	
			}
			
			)();
	}
	return dataObj;
  }