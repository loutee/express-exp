/* jshint esversion: 6, asi: true */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')


// CREATE
app.post('/abilities', (req, res) => {

  db.collection('abilities').save(req.body, (err, result) => {

    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')

  })
})

// READ
app.get('/', (req, res) => {

  db.collection('abilities').find().toArray( (err, result) => {
    if (err) console.log(err)
    // renders index.ejs
    res.render('index.ejs', {ability: result})
  })
})

// UPDATE
app.put('/abilities', (req, res) => {

  db.collection('abilities')
  .findOneAndUpdate({name: 'Ironman'}, {

    $set: {
      name: req.body.name,
      ability: req.body.ability
    }

  }, {

    sort: {_id: -1},
    upsert: true

  }, (err, result) => {

    if(err) return res.send(err)
    res.send(result)

  })
})

// DELETE
app.delete('/abilities', (req,res) => {

  db.collection('abilities').findOneAndDelete({name: req.body.name},
  (err, result) => {

    if (err) return res.send(500, err)
    res.json('Entry deleted')

  })

})

// Connect to database, run server if successful
var db
MongoClient.connect('mongodb://admin:foobar@ds161890.mlab.com:61890/hero-abilities', (err, database) => {

  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {

    console.log('listening on 3000')

  })
})
