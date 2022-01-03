const express = require('express');

const router = express.Router();

const gameRouter = (controller, auth) => {
  router.get('/', controller.index.bind(controller));
  router.post('/create', auth, controller.create.bind(controller));
  router.put('/update/:id', controller.update.bind(controller));

  return router;
};

module.exports = gameRouter;
