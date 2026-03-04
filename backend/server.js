const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  transports: ['polling'],  // polling only - works on Render free tier
  allowEIO3: true
})

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/needs', require('./routes/needRoutes'))
app.use('/api/chat', require('./routes/chatRoutes'))

app.get('/', (req, res) => res.json({ message: 'HelpBridge API Running' }))
app.get('/healthz', (req, res) => res.json({ status: 'ok' }))

const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Message = require('./models/Message')

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error('No token'))
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) return next(new Error('User not found'))
    socket.user = user
    next()
  } catch(e) { next(new Error('Auth failed')) }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.user?.name)

  socket.on('join_room', async (roomId) => {
    socket.join(roomId)
    try {
      const history = await Message.find({ room: roomId })
        .populate('sender', 'name')
        .sort('createdAt')
        .limit(50)
      socket.emit('message_history', history)
    } catch(e) { console.error(e) }
  })

  socket.on('send_message', async ({ roomId, text }) => {
    try {
      const msg = await Message.create({
        room: roomId,
        sender: socket.user._id,
        text
      })
      const populated = await msg.populate('sender', 'name')
      io.to(roomId).emit('new_message', populated)
    } catch(e) { console.error(e) }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user?.name)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, '0.0.0.0', () => console.log('Server running on port ' + PORT))
