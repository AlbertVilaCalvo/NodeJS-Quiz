var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar sqlite
var sequelize = new Sequelize(null, null, null,
  {dialect: 'sqlite', storage: 'quiz.sqlite'}
);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;

sequelize.sync().success(function() {
  Quiz.count().success(function (count) {
    // Si está vacia creamos una fila
    if (count === 0) {
      Quiz.create({
        pregunta: 'Capital de Italia',
        respuesta: 'Roma'
      }).success(function() {
        console.log('Base de datos inicializada');
      });
    }
  });
});
