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
      const token = jwt.sign(payload, JWT_SALT, { expiresIn: '5mins' });
      return res.status(200).send({ newUser, token });
    } catch (error) { console.log(error); }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('current user info', email, password);
    if (!email || !password) {
      return res.status(500).send({ msg: 'You are an idiot' });
    }
    const user = await db.User.findOne({ where: { email } });
    // bcrypt compares the input password (hashes it) with the hashed password in the db
    console.log('current user', user);
    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      // Cookies
      res.cookie('loggedIn', true);
      res.cookie('userId', user.id);
      return res.status(200).send({ success: true, name: user.name });

      // // JWT
      // const payload = { id: user.id, email: user.email };
      // const token = jwt.sign(payload, JWT_SALT, { expiresIn: '5mins' });
      // console.log('jwt payload', payload);
      // console.log('jwt token', token);

      // return res.status(200).send({ success: true, name: user.name, token });
    }
    return res.status(401).send({ error: 'wrong password' });
  };

  return { signup, login };
};

module.exports = initUserController;
