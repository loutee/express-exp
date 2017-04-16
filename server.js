/* jshint esversion: 6, asi: true */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient


app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {

  //res.sendFile(__dirname + '/index.html');

  db.collection('abilities').find().toArray( (err, result) => {

    if (err) console.log(err)

    // renders index.ejs

    res.render('index.ejs', {ability: result})

  })

})

app.post('/abilities', (req, res) => {

  db.collection('abilities').save(req.body, (err, result) => {

    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')

  })
})

var db

MongoClient.connect('mongodb://admin:foobar@ds161890.mlab.com:61890/hero-abilities', (err, database) => {

  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {

    console.log('listening on 3000')

  })
})
