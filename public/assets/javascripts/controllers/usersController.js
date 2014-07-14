var myApp = angular.module('userController', []);
myApp.controller('userCtrl', function($scope, $http, $state) {

    $scope.users = {};
    $state.transitionTo('usuarios.formulario');
    //obtener todas las usuario registradas
    $scope.getallUsers = function() {
        $http.get('/users/getallUsers')
            .success(function(datos) {
                $scope.users = datos;
                $scope.count = $scope.users.length;
            })
            .error(function(err) {
                console.log('Error al cargar la lista de usuarios: ', err);
            });
    }

    //actualiza la tabla.
    $scope.getallUsers();

    /***********************************************
     *
     *             Button's Actions
     *
     ************************************************/

    $scope.cancelCreate = function() {
        $state.go('usuarios');
    }

    $scope.addButton = function() {
        $scope.formInformation = {
            action: 'Crear',
            resource: 'Usuario'
        };
        $scope.usuario = "";
        $state.go('.formulario');
    }

    $scope.editButton = function(id) {
        $scope.formInformation = {
            action: 'Editar',
            resource: 'Usuario'
        }
        for (user in $scope.users) {
            if ($scope.users[user]._id == id)
                $scope.usuario = $scope.usuario[user];
        }
        $state.go('.formulario');
    }

    /***********************************************
     *
     *             Request
     *
     ************************************************/

    $scope.createUser = function() {
        $http.post('/users/createUser', $scope.usuario)
            .success(function(data) {
                if (data.estado == "usuario creado") {
                    console.log('usuario creado');

                }
                $scope.getallUsers();
                $state.go('usuarios');
            })
            .error(function(err) {
                console.log('Error al crear la usuario ', err);
            });
    }

    $scope.editUser = function(usuario, id) {

        $http.put('/users/updateUser/' + usuario, id)
            .success(function(data) {
                if (data.estado == 'usuario actualizado') {
                    console.log('usuario actualizado');
                    $state.go('usuarios');
                    $scope.getallUsers();
                }
            })
            .error(function(err) {
                console.log('Error al actualizar el usuario: ', err);
            });
    }



    $scope.deleteUser = function(id) {
        $http.delete('/users/user/' + id)
            .success(function(datos) {
                if (datos.estado == 'usuario borrado')
                    console.log('usuario borrado');
                $scope.getallUsers();
            })
            .error(function(err) {
                console.log('Error al intentar borrar el usuario: ', err);
            })
    }


});
