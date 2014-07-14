var express = require('express');
var cors = require('cors');
var router = express.Router();

var Model = require('../models/Model.js');
/*PLANTILLA
router.get('/',function(req,res,next){
    Model.User.find(function(err,users){
        if(err)
            res.send(err);
        res.json()
    })
});
*/
router.get('/getallUsers', function(req, res, next) {
    Model.User.find(function(err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos);
    })
});
// CREATE user
router.post('/createUser', function(req, res, next) {
    new Model.User({
        nombre: req.body.nombre,
        email: req.body.email,
        username: req.body.username,
        pass: req.body.pass,
        confirm: req.body.confirm,
        regId: null
    }).save(function(err) {
        if (err) {
            res.json({
                estado: "Error al crear el usuario"
            });
        } else {
            res.json({
                estado: "usuario creado"
            });
        }
    });
});

router.put('/updateUser/:id', function(req, res, next) {
    var conditions = {
        _id: req.params.id
    };
    var update = {
        nombre: req.body.nombre,
        email: req.body.email,
        username: req.body.username,
        pass: req.body.pass,
        confirm: req.body.confirm,
    };
    var options = {
        upsert: true
    };
    Model.User.update(conditions, update, options, function(err) {
        if (err) {
            console.log('error al actualizar el registro de este usuario', err);
        } else {
            res.json({
                estado: 'usuario actualizado'
            });
        }
    });
});


//DELETE a specific task.

router.delete('/user/:id', function(req, res) {
    Model.User.remove({
        _id: req.params.id
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({
            estado: 'usuario borrado'
        })
    });
});



/* PARA CARGAR VISTA DE PARCIALES */
router.get('/partials-users/:name', function(req, res) {
    var name = req.params.name;
    var path = req.url;
    //res.render('partials/'+name);
    res.sendfile('./app/views/partials-users/' + name);
});

module.exports = router;
