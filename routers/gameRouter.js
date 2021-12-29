const express = require('express');

const router = express.Router();

const gameRouter = (controller) => {
  router.get('/', controller.index.bind(controller));
  router.post('/create', controller.create.bind(controller));
  router.put('/update/:id', controller.update.bind(controller));

  // router.put('/', controller.update.bind(controller));

  // router.put('/', controller.putMethod);
  return router;
};

module.exports = gameRouter;
