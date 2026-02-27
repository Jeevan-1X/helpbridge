const mongoose = require('mongoose')
const needSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Groceries','Repairs','Tutoring','Transport','Moving','Tech Help','Other'] },
  urgency: { type: String, enum: ['low', 'med', 'high'], default: 'low' },
  location: { type: String, default: '' },
  status: { type: String, enum: ['Open', 'Accepted', 'Fulfilled'], default: 'Open' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Need', needSchema)
