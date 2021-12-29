const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { PW_SALT, JWT_SALT } = process.env;
const initUserController = (db) => {
  const signup = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ msg: 'You are an idiot' });
    }
    const hash = await bcrypt.hash(password, Number(PW_SALT));
    // post data into our db
    // ...
  };

  const login = async (req, res) =>{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ msg: 'You are an idiot' });
    }
     const user = await db.User.findOne({where:{email}})
     // bcrypt compares the input password (hashes it) with the hashed password in the db
     const compare = await bcrypt.compare(password, user.password)

     if(compare){
       const payload = {id:user.id, email:user.email}
       const token = jwt.sign(payload, JWT_SALT, {expiresIn: '5mins'})
       return res.status(200).json({success:true, token})
     }
     return res.status(500).json({msg: 'failed'})
  }

  const 
  return { signup };
};
