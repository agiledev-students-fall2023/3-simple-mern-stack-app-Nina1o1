require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')
// const url = require('url')
const path = require('path')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// serve my photo (static file)
app.use(express.static(path.join(__dirname, 'public')));

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

app.get('/aboutus', (req, res) => {
  try {
    const myparags = "My name is Qiwen Xiao, also go by Nina.\n" +
    "I tell everyone that Nina is my preferred name.\n" +
    "It is weird, isn't it? You see... my real name is Qiwen.\n" +
    "But I really like 'Nina.' I picked this name from a list of English names in an English class when I was really little.\n" +
    "I picked it because the 'n' in 'nina' assembled a cave hole. That fascinated me.\n" +
    "Also, my friends like to call me 'nani,'\n" +
    "... which is a dramatic 'what' in English\n" + 
    "So wierd that I actually identify myself with an English name!"
    return res.json({
      myparags: myparags,
      myimg: `http://localhost:${process.env.PORT}/myphoto.jpg`
    })
  } catch {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
