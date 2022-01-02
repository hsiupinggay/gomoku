const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();

const { PORT } = process.env; // will return object with all secrets

// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
// app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));
// import routes
const userRouter = require('./routers/userRouter');
const gameRouter = require('./routers/gameRouter');

// import controllers
const initUserController = require('./controllers/userController');
const initGameController = require('./controllers/gameController');
// import models
const db = require('./models/index');

// import middlewares
const auth = require('./middlewares/auth');

// initialize controllers
const userController = initUserController(db);
const gameController = initGameController(db);

// route the routes
app.use('/users', userRouter(userController));
app.use('/games', gameRouter(gameController, auth));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
