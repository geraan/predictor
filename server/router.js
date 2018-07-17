const userController = require('./controllers/user');
const predictionController = require('./controllers/prediction');
const apiController = require('./controllers/api');

module.exports = (app) => {
  //api
  app.get('/api/daily-schedule', apiController.all);

  //users
  app.get('/users', userController.all);
  app.get('/users/:id', userController.getById);
  app.post('/users', userController.create);

  //predictions
  app.get('/predictions', predictionController.all);
  app.post('/predictions', predictionController.create);
};