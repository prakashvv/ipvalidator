// module
var app = angular.module('app', []);

// controller
app.controller("controller", controller);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

//  data object
app.factory('service', ['$rootScope', function ($rootScope) {
    var service = {
        address: '0.0.0.0',
        SaveState: function () {
            sessionStorage.service = angular.toJson(service.address);
        },
        RestoreState: function () {
            service.address = angular.fromJson(sessionStorage.service);
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);


function controller($scope, $http, service) {
    $scope.service = service;
    $scope.currentStep = 1;
    $scope.steps = [
      {
          step: 1,
          name: "Enter Address",
      },
      {
          step: 2,
          name: "Network Interfaces",
      },
    ];


    $scope.gotoStep = function (nextStep) {
        // pre-validations
        if (nextStep == 2) {
            if (!$scope.service.address) {
                alert("Please enter address");
                return;
            }

            var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!$scope.service.address.match(ipformat)) {
                alert("Please enter a valid address");
                return;
            }
        }

        // go-to step
        $scope.currentStep = nextStep;

        if ($scope.currentStep == 2) {
            var interfacesReq = {
                method: 'GET',
                url: 'interfaces/',
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            var machinessReq = {
                method: 'GET',
                url: 'machines/',
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            $http(interfacesReq).then(function (interfaces) {
                $scope.allInterfaces = interfaces.data;
                $http(machinessReq).then(function (machines) {
                    $scope.allMachines = machines.data;

                    var interface = $scope.allInterfaces.find(function (interface) { return interface.address == $scope.service.address });
                    var machineId = interface.machine;
                    var machine = $scope.allMachines.find(function (machine) { return machine.id == machineId });

                    $scope.machine = machine;
                    $scope.interfaces = $scope.allInterfaces.filter(function (interface) { return interface.machine == machineId });
                });
            });
        }
    }

    $scope.save = function () {
        alert("Done...");
    }
};
