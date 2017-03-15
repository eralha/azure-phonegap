var ControllersModule = angular.module('starter.controllers', [])

ControllersModule.controller('DashCtrl', function($scope) {

	// Shows user authentication dialog if required
	function authenticate(authCompletedCallback, errorCallback) {
	  var authContext = new Microsoft.ADAL.AuthenticationContext(authority);
	  authContext.tokenCache.readItems().then(function (items) {
	    if (items.length > 0) {
	        authority = items[0].authority;
	        authContext = new Microsoft.ADAL.AuthenticationContext(authority);
	    }
	    // Attempt to authorize user silently
	    authContext.acquireTokenSilentAsync(resourceUri, clientId)
	    .then(authCompletedCallback, function () {
	        // We require user credentials so triggers authentication dialog
	        authContext.acquireTokenAsync(resourceUri, clientId, redirectUri)
	        .then(authCompletedCallback, errorCallback);
	    });
	  });
	};

	authenticate(function(authResponse) {
	  console.log("Token acquired: " + authResponse.accessToken);
	  console.log("Token will expire on: " + authResponse.expiresOn);
	}, function(err) {
	  console.log("Failed to authenticate: " + err);
	});


});
