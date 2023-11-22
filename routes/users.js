const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// register user
router.post('/register', async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json({_id: user._id, username: user.username});
  } catch (error) {
    res.status(500).json(error);
  }
});

// login user
router.post('/login', async (req, res) => {
  try {
    // find user
    const user = await User.findOne({username: req.body.username});
    if (user === null) {
      res.status(400).json('Credentiale incorecte!');
    } else {
      // validate password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword === false) {
        res.status(400).json('Credentiale incorecte!');
      } else {
        res.status(200).json({_id: user._id, username: user.username});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// export router

module.exports = router;
