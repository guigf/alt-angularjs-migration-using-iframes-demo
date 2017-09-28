(function () {
    angular
        .module('legacy')
        .controller('TextoCtrl', function ($scope) {
          $scope.texto = localStorage.getItem("texto") || '';
  
          $scope.changeText = function () {
            console.log("Setting the texto to " + $scope.texto);
            localStorage.setItem("texto", $scope.texto)
          };
  
          $scope.reset = function () {
            $scope.texto = '';
            console.log("Setting the texto to " + $scope.texto);
            localStorage.setItem("texto", '')
          }
  
        });
  })();
  
  
  
  
  