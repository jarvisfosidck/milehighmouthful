'use strict';

/* Controllers */

var providers = {};
var mouthfulEditPostApp = angular.module('mouthfulEditPostApp', ['ngSanitize'], function($controllerProvider, $compileProvider, $provide) {
    providers = {
        $controllerProvider: $controllerProvider,
        $compileProvider: $compileProvider,
        $provide: $provide
    };
});

/*
var queueLen = angular.module('mouthfulEditPostApp')._invokeQueue.length;
*/

mouthfulEditPostApp.controller('mouthfulAdminCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  
  $scope.post = window.blogPostForEditTemplate;//preloaded JSON is faster than GET it seems
	
		
		
  
}])/*
.factory('incomingPost', function() {
    return { msg: "Some text from a service" };
})

.directive('paragraphControl', function(addParagraphControl)


function updateAddPostTemplate($scope,post) {
	
	
	console.log(post);
	
	
	
}*/