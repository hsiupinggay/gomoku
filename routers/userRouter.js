const express = require('express');

const router = express.Router();

const userRouter = (controller) => {
  // router.get('/', auth, controller.getMethod.bind(controller));
  router.post('/signup', controller.signup.bind(controller));
  router.post('/login', controller.login.bind(controller));
  router.put('/logout/:id', controller.logout.bind(controller));
  return router;
};

module.exports = userRouter;
