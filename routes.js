module.exports = function bindRoutes(app) {
  app.get('/', (request, response) => {
    response.render('index');
  });
};
