var users = { admin: {id:1, username:"admin", password:"1234"},
              pepe:  {id:2, username:"pepe", password:"5678"}
            };

var models = require('../models/models.js');

/// Comprueba si el usuario esta registrado en users
// Si autenticación falla o hay errores se ejecuta callback(error).
exports.autenticar = function(login, password, callback) {
	models.User.find({
        where: {
            username: login
        }
    }).then(function(user) {
    	if (user) {
    		if(user.verifyPassword(password)){
            	callback(null, user);
        	}
        	else { callback(new Error('Password erróneo.')); }
      	} else { callback(new Error('No existe user=' + login))}
    }).catch(function(error){callback(error)});
};
