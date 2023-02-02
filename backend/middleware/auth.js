// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// import User from '../models/User.js'

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (e) {
    res.status(401).json({ success: false, error: 'Please authenticate!' })
  }
}

// module.exports = auth