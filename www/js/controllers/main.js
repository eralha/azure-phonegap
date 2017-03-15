var ControllersModule = angular.module('starter.controllers', [])

ControllersModule.controller('DashCtrl', function($scope) {

	var authority = "https://login.windows.net/common",
	    redirectUri = "http://MyDirectorySearcherApp",
	    resourceUri = "https://graph.windows.net",
	    clientId = "a5d92493-ae5a-4a9f-bcbf-9f1d354067d3",
	    graphApiVersion = "2013-11-08";

	// Shows user authentication dialog if required
	function authenticate(authCompletedCallback, errorCallback) {
		if(Microsoft){
			$scope.logMS = 'API FOUND';
			$scope.$apply();
		}
	  var authContext = new Microsoft.ADAL.AuthenticationContext(authority);
	  authContext.tokenCache.readItems().then(function (items) {
	    if (items.length > 0) {
	        authority = items[0].authority;
	        authContext = new Microsoft.ADAL.AuthenticationContext(authority);
	    }

	    $scope.logMS = 'log in Attempt';
	    $scope.$apply();

	    // Attempt to authorize user silently
	    authContext.acquireTokenSilentAsync(resourceUri, clientId)
	    .then(authCompletedCallback, function () {
	        // We require user credentials so triggers authentication dialog
	        authContext.acquireTokenAsync(resourceUri, clientId, redirectUri)
	        .then(authCompletedCallback, errorCallback);
	    });
	  });
	};

	$scope.loginMS = function(){
		authenticate(function(authResponse) {
		  console.log("Token acquired: " + authResponse.accessToken);
		  console.log("Token will expire on: " + authResponse.expiresOn);

		  $scope.logMS = 'User loged in expira a: '+authResponse.expiresOn;
		  $scope.$apply();
		}, function(err) {
		  console.log("Failed to authenticate: " + err);

		  $scope.logMS = 'User loged out';
		  $scope.$apply();
		});
	}


});
