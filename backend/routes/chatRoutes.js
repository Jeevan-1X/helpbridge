const express = require('express')
const router = express.Router()
const Message = require('../models/Message')
const Need = require('../models/Need')
const { protect } = require('../middleware/authMiddleware')

// Get messages for a need
router.get('/:needId', protect, async (req, res) => {
  try {
    const need = await Need.findById(req.params.needId)
    if (!need) return res.status(404).json({ message: 'Need not found' })
    const userId = req.user._id.toString()
    const posterId = need.postedBy.toString()
    const helperId = need.acceptedBy?.toString()
    if (userId !== posterId && userId !== helperId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    const messages = await Message.find({ needId: req.params.needId })
      .populate('sender', 'name')
      .sort('createdAt')
    res.json(messages)
  } catch (e) { res.status(500).json({ message: e.message }) }
})

// Send a message
router.post('/:needId', protect, async (req, res) => {
  try {
    const need = await Need.findById(req.params.needId)
    if (!need) return res.status(404).json({ message: 'Need not found' })
    const userId = req.user._id.toString()
    const posterId = need.postedBy.toString()
    const helperId = need.acceptedBy?.toString()
    if (userId !== posterId && userId !== helperId) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    const msg = await Message.create({
      needId: req.params.needId,
      sender: req.user._id,
      text: req.body.text
    })
    const populated = await msg.populate('sender', 'name')
    // emit via socket
    if (req.app.get('io')) {
      req.app.get('io').to(req.params.needId).emit('message', populated)
    }
    res.json(populated)
  } catch (e) { res.status(500).json({ message: e.message }) }
})

// Mark need as fulfilled
router.put('/:needId/fulfill', protect, async (req, res) => {
  try {
    const need = await Need.findById(req.params.needId)
    if (!need) return res.status(404).json({ message: 'Need not found' })
    if (need.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only poster can mark as fulfilled' })
    }
    need.status = 'Fulfilled'
    await need.save()
    if (req.app.get('io')) {
      req.app.get('io').to(req.params.needId).emit('fulfilled', need)
    }
    res.json(need)
  } catch (e) { res.status(500).json({ message: e.message }) }
})

module.exports = router