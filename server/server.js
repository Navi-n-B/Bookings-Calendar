const express = require('express');
const app = express();
const port = 6660;
const Reservations = require('./database/index.js').Reservations;
const Listings = require('./database/index.js').Listings;
const { queryResByListing, queryListingsById } = require('./database/db.helpers.js');
const { formatAllRes } = require('./helpers.js');
var Promise = require('bluebird');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const bodyParser = require('body-parser');

const _dirname = '../dist';

app.use('/rooms/:id', express.static(_dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/Calendar/:id', (req, res) => {
  return queryResByListing(req.params.id)
    .then((data) => {
      res.send(formatAllRes(data));
    })
    .catch(() => {
      console.log('your queries suck');
      res.sendStatus(404);
    })
});

app.get('/api/Bookings/:id', (req, res) => {
  return queryListingsById(req.params.id)
    .then((data) => {
      res.send((data));
    })
    .catch(() => {
      console.log('your queries suck');
      res.sendStatus(404);
    })
});

// app.post('/', (req, res) => {
//   console.log('POST request');
//   res.end();
// })

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
})