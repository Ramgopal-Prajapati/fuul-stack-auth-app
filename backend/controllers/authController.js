const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register user
exports.register = async (req, res) => {
  try {
    const { name, userid, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ userid });
    if (userExists) {
      return res.status(400).json({ message: 'User ID already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      userid,
      password,
      profilePhoto: req.file ? req.file.path : ''
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        userid: user.userid,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { userid, password } = req.body;

    const user = await User.findOne({ userid });

    if (user && (await user.correctPassword(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        userid: user.userid,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid user ID or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      _id: user._id,
      name: user.name,
      userid: user.userid,
      profilePhoto: user.profilePhoto
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};