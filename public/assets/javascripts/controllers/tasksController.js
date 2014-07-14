var myApp = angular.module('taskController', []);

myApp.controller('MainCtrl', function($scope, $http, $state) {

    $scope.tasks = {};
    var seleccionado = [];

    /***********************************************
     *
     *             Button's Actions
     *
     ************************************************/
    
    $scope.submitForm = function(isValid) {
        if(isValid){
            alert('awesome');
        }
    }

    $scope.cancelButton = function() {
        $state.go('sinasignar');
    }

    $scope.editButton = function(id) {
        $scope.formInformation = {
            action: 'Editar',
            resource: 'tarea'
        }
        for (task in $scope.tasks) {
            if ($scope.tasks[task]._id == id)
                $scope.usuario = $scope.tasks[task];
        }
        $state.go('.formulario');
    }

    $scope.addButton = function() {
        $scope.formInformation = {
            action: 'Crear',
            resource: 'tarea'
        };
        $scope.usuario = "";
        $state.go('.formulario');
    }

    /***********************************************
     *
     *             Request
     *
     ************************************************/

    //obtener todas las tareas registradas
    $scope.getallTasks = function() {
        $http.get('/tasks/getallTasks')
            .success(function(datos) {
                $scope.tasks = datos;
            })
            .error(function(err) {
                console.log('Error al cargar todas tareas: ', err);
            });
    }


    //actualiza la tabla.
    $scope.getallTasks();



    $scope.createTask = function() {
        $http.post('/tasks/createTask', $scope.usuario)
            .success(function(data) {
                if (data.estado == "tarea creada") {
                    console.log('tarea creada');
                    $scope.getallTasks();
                    $state.go('sinasignar');
                }
            })
            .error(function(err) {
                console.log('Error al crear la tarea ', err);
            });
    }


    $scope.editTask = function(usuario, id) {

        $http.put('/tasks/updateTask/' + id, usuario)
            .success(function(data) {
                if (data.estado == 'tarea actualizada') {
                    console.log('tarea actualizada');
                    $state.go('sinasignar');
                    $scope.getallTasks();
                }
            })
            .error(function(err) {
                console.log('Error al actualizar una tarea: ', err);
            });
    }



    $scope.deleteTask = function(id) {
        $http.delete('/tasks/task/' + id)
            .success(function(datos) {
                if (datos.estado == 'tarea borrada')
                    console.log('tarea borrada');
                $scope.getallTasks();
            })
            .error(function(err) {
                console.log('Error al intentar borrar la tarea: ', err);
            })
    }


    /***********************************************
     *
     *             Helpers
     *
     ************************************************/


    $scope.cobrador = null;


    $scope.getUser = function(id) {
        $scope.cobrador = id;
        console.log($scope.cobrador);
    }

    $scope.getSeleccionados = function() {
        $scope.seleccionados = seleccionado;
        $scope.count = seleccionado.length;
        console.log($scope.seleccionados);
    }

    $scope.ischecked = function(id, task_isChecked) {
        var items = $scope.tasks;

        if (task_isChecked == true) {
            for (item in items) {
                if (id == items[item]._id && task_isChecked == true) {
                    seleccionado.push(items[item]._id);
                }
            }
        } else {
            for (x in seleccionado) {
                if (id == seleccionado[x]) {
                    seleccionado.splice(x, 1);
                }
            }
        }
        $scope.getSeleccionados();
    }





});
