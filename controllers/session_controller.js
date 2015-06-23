// Middleware de autorización de accesos HTTP restringidos - ver routes/index.js
exports.loginRequired = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// GET /login - formulario login
exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new', {errors: errors});
};

// POST /login - crear session
exports.create = function(req, res) {
  var login =    req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user) {
    if (error) {
      req.session.errors = [{'message': 'Se ha producido un error: ' + error}];
      res.redirect('/login');
      return;
    }
    // Crear req.session.user y guardar campos id y username
    req.session.user = { id: user.id, username: user.username, lastRequestTime: Date.now() };
    // Redireccion a path anterior a login (ver app.js)
    res.redirect(req.session.redir.toString());
  });
};

// POST /logout - destruir session
exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString()); // redirect path anterior al login (ver app.js)
};
