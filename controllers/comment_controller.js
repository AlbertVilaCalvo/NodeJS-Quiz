var models = require('../models/models.js');

// GET /Commentes/new
exports.new = function(req, res) {
  res.render('comments/new', {quizId: req.params.quizId, errors: []});
};

// POST /Commentes/create
exports.create = function(req, res) {
  var comment = models.Comment.build({
    texto: req.body.comment.texto,
    QuizId: req.params.quizId
  });
  // Guardar en DB
  comment
  .validate()
  .then(function(err){
    if (err) {
      res.render('comments/new', {comment: comment, errors: err.errors});
    } else {
      comment
      .save()
      .then(function() {
        res.redirect('/quizes/' + req.params.quizId);
      });
    }
  }).catch(function(error){next(error);});
};