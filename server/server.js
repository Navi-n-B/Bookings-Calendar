const express = require('express');
const app = express();
const port = 6660;
const Reservations = require('./database/index.js').Reservations;
var Promise = require('bluebird');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const _dirname = '../dist';

app.use(express.static(_dirname));

app.get('/rooms', (req, res) => {
  // console.log(query);
  return Reservations.findAll({
    attributes: ['start_date', 'end_date'],
    where: {
      id: 5}
  })
    .then((data) => {
      // console.log(data);
      res.end(data);
    })
    .catch(() => {
      res.sendStatus(404);
    })
});

app.post('/', (req, res) => {
  console.log('POST request');
  res.end();
})

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
})