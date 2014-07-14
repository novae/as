var express = require('express');
var cors = require('cors');
var router = express.Router();

var Model = require('../models/Model.js');

// Tasks's List
router.get('/getallTasks', function(req, res, next) {
    Model.Task.find(function(err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
});

// CREATE task

router.post('/createTask', cors(), function(req, res, next) {
    new Model.Task({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        email: req.body.email,
        cantidad: req.body.cantidad
    }).save(function(err) {
        if (err) {
            res.json({
                estado: 'Error al crear la tarea'
            });
        } else {
            res.json({
                estado: 'tarea creada'
            });
        }
    });
});

// SHOW task

router.get('/thistask/:id', function(req, res, next) {
    Model.Task.find({
        _id: req.params.id
    }, function(err, task) {
        if (err) {
            res.json({
                estado: 'Error al mostrar la tarea'
            });
        } else {
            res.json({
                task: task,
                estado: 'tarea enviada'
            });
        }
    })
})

//DELETE a specific task.

router.delete('/task/:id', function(req, res) {
    Model.Task.remove({
        _id: req.params.id
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({
            estado: 'tarea borrada'
        })
    });
});


// EDIT task

router.put('/updateTask/:id', function(req, res) {
    
    var conditions = {
        _id: req.params.id
    };
    var update = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        email: req.body.email,
        cantidad: req.body.cantidad
    };
    var options = {
        upsert: true
    };
    Model.Task.update(conditions, update, options, function(err) {
        if (err) {
            console.log('error al actualizadr registro', err);
        } else {
            res.json({
                estado: 'tarea actualizada'
            });
        }
    });

});




/* PARA CARGAR VISTA DE PARCIALES */
router.get('/partials-tasks/:name', function(req, res) {
    var name = req.params.name;
    var path = req.url;
    //res.render('partials/'+name);
    res.sendfile('./app/views/partials-tasks/' + name);
});

module.exports = router;