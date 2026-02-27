const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer')) {
    try {
      const token = auth.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      return next()
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }
}

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next()
  return res.status(403).json({ message: 'Admin access only' })
}

module.exports = { protect, adminOnly }
