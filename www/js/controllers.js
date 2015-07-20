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

.controller('NoticiasCtrl', function($scope, $firebaseArray, $cordovaSQLite) {

  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/noticias");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
        var query = "SELECT NoticiaID,Fuente,TextoNoticia,Titulo,UrlImagen,Fecha FROM noticias";

        document.addEventListener('deviceready', function() { 
           $cordovaSQLite.execute(db, query, []).then(function(res) {
            var ret;
          var arr = [];
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).Fuente + " " + res.rows.item(0).Titulo);

                for (var i = 0; i < res.rows.length; i++) {
                    var row = res.rows.item(i);
                    //ret = row.urlcolmn;
                    arr.push(row);

                }
                $scope.noticias = arr;
               // console.log("DE ARRAY NOTICIAS -> "  +  $scope.noticias);

            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error("ERROR EN SELECT  " + err);
        });
      }, false);

       

      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.noticias = $firebaseArray($scope.ref);
         $scope.noticias.$loaded().then(function(data) {
            $cordovaSQLite.execute(db,'DELETE FROM noticias',[]);
            angular.forEach($scope.noticias, function(noticia) {
            //this.push(key + ': ' + value);
            var query = "INSERT INTO noticias (NoticiaID,Fuente,TextoNoticia,Titulo,UrlImagen,Fecha) VALUES (?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [noticia.NoticiaID, noticia.Fuente,noticia.TextoNoticia,noticia.Titulo,noticia.UrlImagen,noticia.Fecha]).then(function(res) {
                 console.log("INSERT ID -> " + res.insertId);
            }, function (err) {
                console.log(err);
            });

           });
         });

      }
    });

  
})


.controller('NoticiaDetailCtrl', function($scope, $stateParams, $firebaseObject, $cordovaSQLite) {
  
//  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/noticias");

  var ref = new Firebase("https://quirquinchosanto.firebaseio.com/noticias/"+$stateParams.NoticiaID);
  
  ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
        var query = "SELECT NoticiaID,Fuente,TextoNoticia,Titulo,UrlImagen,Fecha FROM noticias Where NoticiaID = ?";
        document.addEventListener('deviceready', function() { 
           $cordovaSQLite.execute(db, query, [$stateParams.NoticiaID]).then(function(res) {
           
              if(res.rows.length > 0) {
                  console.log("SELECTED With ID-> " + res.rows.item(0).Fuente + " " + res.rows.item(0).Titulo);
                  var row = res.rows.item(0);
                  $scope.noticia = row ;
                 // console.log("DE ARRAY NOTICIAS -> "  +  $scope.noticias);

              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error("ERROR EN SELECT  " + err);
          });
        }, false);

      }
      else{
          $scope.noticia = $firebaseObject(ref);
          console.log($scope.noticia);
      }
  });

  


})

.controller('EquipoCtrl', function($scope, $firebaseArray, $cordovaSQLite) {

  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/equipo");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");

        var query = "SELECT JugadorID,Nombre,Posicion,GolesAnotados,PartidosDisputados,TarjetasAmarillas,TarjetasRojas,ImagenUrl,Fecha FROM equipo";

        document.addEventListener('deviceready', function() { 
           $cordovaSQLite.execute(db, query, []).then(function(res) {
            var ret;
          var arr = [];
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).Nombre + " " + res.rows.item(0).Posicion);

                for (var i = 0; i < res.rows.length; i++) {
                    var row = res.rows.item(i);
                    //ret = row.urlcolmn;
                    arr.push(row);

                }
                $scope.equipo = arr;

            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error("ERROR EN SELECT  " + err);
        });
      }, false);

      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.equipo = $firebaseArray($scope.ref);
        $scope.equipo.$loaded().then(function(data) {
            $cordovaSQLite.execute(db,'DELETE FROM equipo',[]);
            angular.forEach($scope.equipo, function(jugador) {
            //this.push(key + ': ' + value);
            var query = "INSERT INTO equipo (JugadorID,Nombre,Posicion,GolesAnotados,PartidosDisputados,TarjetasAmarillas,TarjetasRojas,ImagenUrl,Fecha) VALUES (?,?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [jugador.JugadorID, jugador.Nombre,jugador.Posicion,jugador.GolesAnotados,jugador.PartidosDisputados,jugador.TarjetasAmarillas,jugador.TarjetasRojas,jugador.ImagenUrl,jugador.Fecha]).then(function(res) {
                 console.log("INSERT ID -> " + res.insertId);
            }, function (err) {
                console.log(err);
            });

           });
         });

      }
    });

  
})

.controller('CompetenciasCtrl', function($scope, $firebaseArray, $cordovaSQLite) {

  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/Competencias/Liga");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
        var query = "SELECT Equipo,GolDiferencia,GolesContra,GolesFavor,LogoEquipo,PartidosEmpatados,PartidosGanados,PartidosJugados,PartidosPerdidos,Puntos  FROM liga";

        document.addEventListener('deviceready', function() { 
           $cordovaSQLite.execute(db, query, []).then(function(res) {
            var ret;
          var arr = [];
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).Equipo + " " + res.rows.item(0).Puntos);

                for (var i = 0; i < res.rows.length; i++) {
                    var row = res.rows.item(i);
                    //ret = row.urlcolmn;
                    arr.push(row);

                  }
                  $scope.liga = arr;

              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error("ERROR EN SELECT  " + err);
          });
        }, false);

      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.liga = $firebaseArray($scope.ref);
        $scope.liga.$loaded().then(function(data) {
            $cordovaSQLite.execute(db,'DELETE FROM liga',[]);
            angular.forEach($scope.liga, function(totales) {
            //this.push(key + ': ' + value);
            var query = "INSERT INTO liga (Equipo,GolDiferencia,GolesContra,GolesFavor,LogoEquipo,PartidosEmpatados,PartidosGanados,PartidosJugados,PartidosPerdidos,Puntos) VALUES (?,?,?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [totales.Equipo, totales.GolDiferencia,totales.GolesContra,totale.GolesFavor,totales.LogoEquipo,totales.PartidosEmpatados,totales.PartidosGanados,totales.PartidosJugados,totales.PartidosPerdidos,totales.Puntos]).then(function(res) {
                 console.log("INSERT ID -> " + res.insertId);
            }, function (err) {
                console.log(err);
            });

           });
         });

      }
    });

  

})

.controller('CompetenciasLibertadoresCtrl', function($scope, $firebaseArray, $cordovaSQLite) {


  $scope.ref1 = new Firebase("https://quirquinchosanto.firebaseio.com/Competencias/Libertadores");
  $scope.ref1.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
        var query = "SELECT Equipo,GolDiferencia,GolesContra,GolesFavor,LogoEquipo,PartidosEmpatados,PartidosGanados,PartidosJugados,PartidosPerdidos,Puntos  FROM libertadores";

        document.addEventListener('deviceready', function() { 
           $cordovaSQLite.execute(db, query, []).then(function(res) {
            var ret;
            var arr1 = [];
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).Equipo + " " + res.rows.item(0).Puntos);

                for (var i = 0; i < res.rows.length; i++) {
                    var row = res.rows.item(i);
                    //ret = row.urlcolmn;
                    arr.push(row);

                  }
                  $scope.libertadores = arr1;

              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error("ERROR EN SELECT  " + err);
          });
        }, false);

      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.libertadores = $firebaseArray($scope.ref1);
        $scope.libertadores.$loaded().then(function(data) {
            $cordovaSQLite.execute(db,'DELETE FROM libertadores',[]);
            angular.forEach($scope.libertadores, function(totales) {
            //this.push(key + ': ' + value);
            var query = "INSERT INTO libertadores (Equipo,GolDiferencia,GolesContra,GolesFavor,LogoEquipo,PartidosEmpatados,PartidosGanados,PartidosJugados,PartidosPerdidos,Puntos) VALUES (?,?,?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [totales.Equipo, totales.GolDiferencia,totales.GolesContra,totale.GolesFavor,totales.LogoEquipo,totales.PartidosEmpatados,totales.PartidosGanados,totales.PartidosJugados,totales.PartidosPerdidos,totales.Puntos]).then(function(res) {
                 console.log("INSERT ID -> " + res.insertId);
            }, function (err) {
                console.log(err);
            });

           });
         });

      }
    });

})

.controller('ResultadosCtrl', function($scope, $firebaseArray, $cordovaSQLite) {
  

   $scope.showDetailsCard = false;
   $scope.showDetails = function(detailID) {
        if ($scope.showDetailsCard == true)
           $scope.showDetailsCard = false;
        else
           $scope.showDetailsCard = true;
        
    };

  $scope.ref = new Firebase("https://quirquinchosanto.firebaseio.com/resultados");
  $scope.ref.authAnonymously(function(error, authData) {
      if (error) {
        // There was an error logging in anonymously
        console.log("There was an error logging in anonymously");
        var query = "SELECT fixtureID,EquipoLocal,GolesLocal,EquipoVisitante,GolesVisitante,Fecha,Estado,ImagenLocal,ImagenVisitante, Detalles FROM resultados";

        document.addEventListener('deviceready', function() { 
           $cordovaSQLite.execute(db, query, []).then(function(res) {
            var ret;
          var arr = [];
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).EquipoLocal + " " + res.rows.item(0).EquipoVisitante);

                for (var i = 0; i < res.rows.length; i++) {
                    var row = res.rows.item(i);
                    //ret = row.urlcolmn;
                    arr.push(row);

                  }
                  $scope.resultados = arr;

              } else {
                  console.log("No results found");
              }
          }, function (err) {
              console.error("ERROR EN SELECT  " + err);
          });
        }, false);

      } else {
        // User authenticated with Firebase
        console.log("User authenticated with Firebase");
        $scope.resultados = $firebaseArray($scope.ref);
        $scope.resultados.$loaded().then(function(data) {
            $cordovaSQLite.execute(db,'DELETE FROM resultados',[]);
            angular.forEach($scope.resultados, function(resultado) {
            //this.push(key + ': ' + value);
            var query = "INSERT INTO resultados (fixtureID,EquipoLocal,GolesLocal,EquipoVisitante,GolesVisitante,Fecha,Estado,ImagenLocal,ImagenVisitante,Detalles) VALUES (?,?,?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [resultado.fixtureID, resultado.EquipoLocal,resultado.GolesLocal,resultado.EquipoVisitante,resultado.GolesVisitante,resultado.Fecha,resultado.Estado,resultado.ImagenLocal,resultado.ImagenVisitante,resultado.Detalles]).then(function(res) {
                 console.log("INSERT ID -> " + res.insertId);
            }, function (err) {
                console.log(err);
            });

           });
         });

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