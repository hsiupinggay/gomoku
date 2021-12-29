module.exports = function bindRoutes(app) {
  // // initialize the controller functions here
  // const BugsController = initBugsController(db);
  // const FeaturesController = initFeaturesController(db);
  // // pass in the db for all callbacks
  app.get('/', (request, response) => {
    response.render('index');
  });
  // // define your route matchers here using app
  // app.post('/bug', BugsController.create);

  // // get all features
  // app.get('/features', FeaturesController.findAll);
};
