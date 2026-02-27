const Need = require('../models/Need')
const getNeeds = async (req, res) => {
  try {
    const { category, urgency, status } = req.query
    const filter = {}
    if (category) filter.category = category
    if (urgency) filter.urgency = urgency
    if (status) filter.status = status
    const needs = await Need.find(filter).populate('postedBy', 'name').populate('acceptedBy', 'name').sort('-createdAt')
    res.json(needs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getNeed = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id).populate('postedBy', 'name email').populate('acceptedBy', 'name')
    if (!need) return res.status(404).json({ message: 'Need not found' })
    res.json(need)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const createNeed = async (req, res) => {
  try {
    const { title, description, category, urgency, location } = req.body
    const need = await Need.create({ title, description, category, urgency, location, postedBy: req.user._id })
    res.status(201).json(need)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const acceptNeed = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id)
    if (!need) return res.status(404).json({ message: 'Need not found' })
    if (need.status !== 'Open') return res.status(400).json({ message: 'Need is no longer open' })
    need.status = 'Accepted'
    need.acceptedBy = req.user._id
    await need.save()
    res.json(need)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const fulfillNeed = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id)
    if (!need) return res.status(404).json({ message: 'Need not found' })
    need.status = 'Fulfilled'
    await need.save()
    res.json(need)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const deleteNeed = async (req, res) => {
  try {
    const need = await Need.findById(req.params.id)
    if (!need) return res.status(404).json({ message: 'Need not found' })
    await need.deleteOne()
    res.json({ message: 'Need removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { getNeeds, getNeed, createNeed, acceptNeed, fulfillNeed, deleteNeed }
