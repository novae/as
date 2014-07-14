var myApp = angular.module('myApp', ['ui.router', 'taskController', 'userController']);

myApp.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/index");

    // Now set up the states
    $stateProvider
    
        .state('sinasignar', {
            url: '/sinasignar',
            templateUrl: "tasks/partials-tasks/sinasignar.html",
            controller: 'MainCtrl'
        })
        .state('sinasignar.formulario', {
            url: '/formulario',
            templateUrl: "tasks/partials-tasks/formulario.html",
            controller: 'MainCtrl'
        })
        .state('usuarios', {
            url: '/usuarios',
            templateUrl: "users/partials-users/index.html",
            controller: 'userCtrl'
        })
        .state('usuarios.formulario', {
            url: '/formulario',
            templateUrl: "users/partials-users/formulario.html",
            controller: 'userCtrl'
        })


});
