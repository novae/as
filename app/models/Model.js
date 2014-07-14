var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	nombre	: String,
	email 	: String,
	username: String,
	pass	: String,
	confirm	: String,
	regId	: {
		type	: String,
		default : false
	},
	tasks: [{type: Schema.ObjectId, ref: 'Task'}]
});

var User = mongoose.model('User',UserSchema);


var TaskSchema = new Schema({
	nombre 		: String,
	direccion 	: String,
	email		: String,
	cantidad	: Number,
	tarea_asignada :{
		type: Boolean,
		default: false,
	},
	tarea_cobrada :{
		type: Boolean,
		default: false,
	},
	user: {type: Schema.ObjectId, ref: 'User', childPath:"tasks"}
});

var Task = mongoose.model('Task', TaskSchema);




exports.User = User;
exports.Task = Task;
