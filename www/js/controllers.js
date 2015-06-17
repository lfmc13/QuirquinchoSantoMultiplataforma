angular.module('starter.controllers', ['firebase','ngCordova','ionic.service.core'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('NoticiasCtrl', function($scope, $firebaseArray) {

  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/noticias");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.noticias = $firebaseArray($scope.ref);
      }
    });

  


  /*$scope.addItems = function() {
    var product = {'name':'Iphone', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    var product2 = {'name':'Android', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    $scope.products.push(product);
    $scope.products.push(product2);

    $scope.$broadcast('scroll.infiniteScrollComplete')
  }

  $scope.doRefresh = function() {
    var product = {'name':'Iphone', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    var product2 = {'name':'Android', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    $scope.products.push(product);
    $scope.products.push(product2);

    //$scope.$broadcast('scroll.infiniteScrollComplete')
  }*/

  //$scope.products = [{'name':'Iphone', 'prices': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}, {'name':'Samsung', 'prices': 78.10, 'img': 'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}] 
})


.controller('NoticiaDetailCtrl', function($scope, $stateParams, $firebaseObject) {
  
//  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/noticias");

  var ref = new Firebase("https://quirquinchosanto.firebaseio.com/noticias/"+$stateParams.noticiaId);


  $scope.noticia = $firebaseObject(ref);


  console.log($scope.noticia);


})

.controller('EquipoCtrl', function($scope, $firebaseArray) {

  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/equipo");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.equipo = $firebaseArray($scope.ref);
      }
    });

  
})

.controller('ResultadosCtrl', function($scope, $firebaseArray) {

  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/resultados");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.resultados = $firebaseArray($scope.ref);
      }
    });

  
})

.controller('ConfiguracionCtrl',['$scope', '$rootScope', '$window', '$localstorage' , function($scope, $rootScope, $window, $localstorage) {

   
  

  $scope.data = {};
  $scope.data.alertNotificationsOn = $window.localStorage.getItem('alertNotificationsOn') === "true";

  $scope.setAlertNotifications = function() {
      $window.localStorage.setItem( 'alertNotificationsOn', $scope.data.alertNotificationsOn );
      console.log( $scope.data.alertNotificationsOn );
    } 
  


 /* $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/noticias");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.noticias = $firebaseArray($scope.ref);
      }
    });

  */


  /*$scope.addItems = function() {
    var product = {'name':'Iphone', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    var product2 = {'name':'Android', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    $scope.products.push(product);
    $scope.products.push(product2);

    $scope.$broadcast('scroll.infiniteScrollComplete')
  }

  $scope.doRefresh = function() {
    var product = {'name':'Iphone', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    var product2 = {'name':'Android', 'sale_price': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'};
    $scope.products.push(product);
    $scope.products.push(product2);

    //$scope.$broadcast('scroll.infiniteScrollComplete')
  }*/

  //$scope.products = [{'name':'Iphone', 'prices': 78.10, 'img':'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}, {'name':'Samsung', 'prices': 78.10, 'img': 'http://www.att.com/wireless/iphone/assets/207138-iPhone6-device2.jpg'}] 
}])