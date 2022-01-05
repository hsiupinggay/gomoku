const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PW_SALT, JWT_SALT } = process.env;

const initUserController = (db) => {
  const signup = async (req, res) => {
    console.log('signup backend started');
    const { name, email, password } = req.body;
    console.log('new user', { name, email, password });

    if (!email || !password) {
      return res.status(500).json({ msg: 'You are an idiot' });
    }
    console.log('bcrypt salt', PW_SALT);
    console.log('bcrypt salt type', typeof PW_SALT);

    const hash = await bcrypt.hash(password, Number(PW_SALT));
    console.log(hash);
    // post data into our db
    try {
      const newUser = await db.User.create({
        name,
        email,
        password: hash,
      });

      const payload = { id: newUser.id, email: newUser.email };
      const token = jwt.sign(payload, JWT_SALT, { expiresIn: '100d' });
      return res.status(200).send({ newUser, token });
    } catch (error) { console.log(error); }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('current user info', email, password);
    if (!email || !password) {
      return res.send({ error: 'please type in both email and password' });
    }

    try {
      const user = await db.User.findOne({ where: { email } });
      // bcrypt compares the input password (hashes it) with the hashed password in the db
      console.log('current user', user);

      const compare = await bcrypt.compare(password, user.password);

      if (compare) {
        console.log('password matched');
        // Cookies
        res.cookie('userId', user.id);
        res.cookie('loggedIn', true);

        // JWT
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, JWT_SALT, { expiresIn: '100d' });
        console.log('jwt payload', payload);
        console.log('jwt token', token);

        return res.status(200).send({ success: true, name: user.name, token });
      }
      // if email found but password does not match db
      console.log('error in login, password not found');
      return res.send({ error: 'your email or password is incorrect,</br> please try again' });
    } catch (error) {
      // if email not found
      console.log('error in login, likely email not found');
      return res.send({ error: 'your email or password is incorrect,</br> please try again' });
    }
  };

  const logout = async (req, res) => {
    console.log('current game id:logout function', req.params.id);
    try {
      const currentGame = await db.Game.findByPk(req.params.id);
      console.log('current game', currentGame);

      const updateStatus = await currentGame.update({
        gameState: {
          status: 'completed',
        },
      });

      console.log('status updated', updateStatus);
      res.clearCookie('loggedIn');
      res.clearCookie('userId');
      return res.send({ logoutSuccess: true });
    } catch (error) {
      console.log(error);
    }
  };

  return { signup, login, logout };
};

module.exports = initUserController;
