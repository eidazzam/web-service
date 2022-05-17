const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const hateoasLinker = require('express-hateoas-links')

connectDB()
const app = express()

app.use(express.json())
app.use(hateoasLinker)

app.use(express.urlencoded({ extended: false }))

app.use('/api/articles', require('./routes/article'))
app.use('/api/users', require('./routes/user'))
app.use('/api/comments', require('./routes/comment'))

// hateoasLinker(app);
app.get('/', function (req, res) {
  // create an example JSON Schema
  var personSchema = {
    name: 'Eid',
    description:
      'This JSON Schema defines the parameters required to create a Person object',
    properties: {
      name: {
        title: 'Eid',
        description: 'Hello',
        type: 'string',
        maxLength: 30,
        minLength: 1,
        required: true,
      },
      jobTitle: {
        title: 'Job Title',
        type: 'string',
      },
      telephone: {
        title: 'Telephone Number',
        description: 'Please enter telephone number including country code',
        type: 'string',
        required: true,
      },
    },
  }

  // call res.json as normal but pass second param as array of links
  res.json(personSchema, [
    { rel: 'self', method: 'GET', href: 'http://127.0.0.1' },
    {
      rel: 'create',
      method: 'POST',
      title: 'Create Person',
      href: 'http://127.0.0.1/person',
    },
  ])
})

app.listen(8000, () => console.log(`Connected to Server`.white.bgBlue))
