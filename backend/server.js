const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/needs', require('./routes/needRoutes'))

app.get('/', (req, res) => res.json({ message: 'HelpBridge API Running' }))
app.get('/healthz', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => console.log('Server running on port ' + PORT))
