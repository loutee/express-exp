/* jshint esversion: 6 */
const express = require('express');

const app = express();

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/index.html');

});

app.post('/abilities', (req, res) => {

  console.log('POST request made');

});

app.listen(3000, () => {

  console.log('listening on 3000');

});

