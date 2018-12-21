const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.body.email });
    if (!candidate) {
      res.status(404).json({
        message: 'User with such email not found'
      });
      return;
    }
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (!passwordResult) {
      res.status(401).json({
        message: 'Wrong password'
      });
      return;
    }
    const token = jwt.sign({
      email: candidate.email,
      userid: candidate._id
    }, keys.jwt, { expiresIn: 60 * 60 });
    res.status(200).json({
      token: `Bearer ${token}`
    });
  }
  catch (e) {
    res.status(500).json({ error: e.message});
  }
};

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({
      message: 'This email already exists.'
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(password, salt)
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

