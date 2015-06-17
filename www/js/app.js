// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'ionic.service.core'])

.run(function($ionicPlatform, $ionicLoading, $rootScope, $ionicLoading, $window, $localstorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

   
    $rootScope.token = null;


    $rootScope.refirebase = new Firebase("https://quirquinchosanto.firebaseio.com/");

    //var authRef = new Firebase($rootScope.baseUrl);
    //$rootScope.auth = $firebaseAuth(authRef);
 
    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        template: text ? text : 'Loading..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };
 

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };
 
    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
      }, 1999);
    };
 
    $rootScope.logout = function() {
      $rootScope.refirebase.unauth();
      $rootScope.checkSession();
    };

    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        template: text ? text : 'Loading..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };

    $rootScope.authHandler = function(error, authData) {
      console.log(authData);
      if (error) {
        $rootScope.token = null;
      }
      else {
          $rootScope.token = authData.token;
          $localstorage.set('token', authData.token);
      }
    }
    $rootScope.initSession = function(){
      var token = '';//$localstorage.get('token');
      console.log(token);

      if(token){
        $rootScope.refirebase.authWithCustomToken(token, $rootScope.authHandler);
      }
    }
    //$rootScope.initSession();


    $rootScope.userSignedIn = function(){
        return($rootScope.token != null)
    }

    $rootScope.checkSession = function() {
      //var authData = $rootScope.refirebase.getAuth();
      //if (authData) {
      if(!$rootScope.token){
        $state.go('sign-in');
        //$window.location.href = '#/';
        //console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } 
      //else {
        //$ionicHistory.nextViewOptions({
        //  disableAnimate: true,
        //  disableBack: true
        //});
        //$state.go('sign-in');
      //}
    }
  });
})



.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {

   $ionicAppProvider.identify({
    // The App ID for the server
    app_id: 'f3d4679b',
    // The API key all services will use for this app
    api_key: '6b11e2318c1e056c9aeebca0d32dbd13dea22d5f47940d74',
    
    api_write_key: 'fedafd58e4c5b1907be4eb615ed814ba630c2dde3a9d9f1fc2da0a10010560ff3875ba3cf6360266ef5bb4ac2a45dd974b3791534e06270ca967bc5b4b449a7a7feb16e7a9cd2542c944220d5d51d57891adf5700fed37040a32826f93bf98a434cb023313ef02b0d65d104c6c684a2c522023454e03008f524a282fc0b11e2b9a1447d24c251723f5c4555c4c4fe347'
    // Your GCM sender ID/project number (Uncomment if using GCM)
    //gcm_id: 'YOUR_GCM_ID'
  });

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

    .state('app.noticias', {
      url: "/noticias",
      views: {
        'menuContent': {
          templateUrl: "templates/noticias.html",
          controller: 'NoticiasCtrl'
        }
      }
    })

     .state('app.noticia-detail', {
      url: '/noticia/:noticiaId',
      views: {
        'menuContent': {
          templateUrl: 'templates/noticia-detail.html',
          controller: 'NoticiaDetailCtrl'
        }
      }
    })

   .state('app.equipo', {
      url: "/equipo",
      views: {
        'menuContent': {
          templateUrl: "templates/equipo.html",
          controller: 'EquipoCtrl'
        }
      }
    })

   .state('app.resultados', {
      url: "/resultados",
      views: {
        'menuContent': {
          templateUrl: "templates/resultados.html",
          controller: 'ResultadosCtrl'
        }
      }
    })

   .state('app.competiciones', {
      url: "/competiciones",
      views: {
        'menuContent': {
          templateUrl: "templates/competiciones.html",
          controller: 'CompeticionesCtrl'
        }
      }
    })

   .state('app.configuracion', {
      url: "/configuracion",
      views: {
        'menuContent': {
          templateUrl: "templates/configuracion.html",
          controller: 'ConfiguracionCtrl'
        }
      }
    })

  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/noticias');
});