const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
const Reservations = require('./database/index.js').Reservations;
const Listings = require('./database/index.js').Listings;
const { queryResByListing, queryListingsById } = require('./database/db.helpers.js');
const { formatAllRes } = require('./helpers.js');
var Promise = require('bluebird');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const bodyParser = require('body-parser');

const _dirname = '../dist';

app.use(cors());
app.use('/rooms/:id', express.static(_dirname));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:1337');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/Calendar/:id', (req, res) => {
  return queryResByListing(req.params.id)
    .then((data) => {
      res.json(formatAllRes(data));
    })
    .catch(() => {
      console.log('your queries suck');
      res.sendStatus(404);
    })
});

app.get('/api/Bookings/:id', (req, res) => {
  return queryListingsById(req.params.id)
    .then((data) => {
      res.json((data));
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