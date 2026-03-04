const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const Message = require('../models/Message')

// Get messages for a room
router.get('/:roomId', protect, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId })
      .populate('sender', 'name')
      .sort('createdAt')
      .limit(100)
    res.json(messages)
  } catch(e) { res.status(500).json({ message: e.message }) }
})

// Send a message
router.post('/:roomId', protect, async (req, res) => {
  try {
    const msg = await Message.create({
      room: req.params.roomId,
      sender: req.user._id,
      text: req.body.text
    })
    const populated = await msg.populate('sender', 'name')
    res.json(populated)
  } catch(e) { res.status(500).json({ message: e.message }) }
})

module.exports = router
