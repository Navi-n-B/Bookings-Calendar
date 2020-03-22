const Reservations = require('./index.js').Reservations;
const example_ids = require('./listing_ids.js').listings_ids;
const moment = require('moment');
const Sequelize = require('sequelize');
var Promise = require('bluebird');

// Reservations.sync({force: true});


var popularityRates = { 1: 0.2, 2: 0.3, 3: 0.5, 4: 0.6};
var bookedDays = { 1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 2, 7: 2, 8: 3, 9: 3, 10: 3, 11: 4, 12: 4, 13: 4, 14: 5, 15: 5, 16: 5, 17: 6, 18: 6, 19: 7};
// var count = 0;

var getDocs = function(id, callback) {
  var output = [], popularity, booked, date1, date2, days, month = 0, daysRate, userId, reservation, decay = 1;
  date1 = moment();
  popularity = Math.round(Math.random() * 4);
  // console.log('ran');

  for (var i =0; i < 100; i++) {
    if (month >= 60 && month < 90) {
      decay = 0.9;
    }
    if (month >= 90 && month < 120) {
      decay = 0.8;
    }
    if (month >= 120 && month < 150) {
      decay = 0.6;
    }
    if (month >= 120 && month < 150) {
      decay = 0.6;
    }
    if (month >= 150 && month < 180) {
      decay = 0.3;
    }
    if (month >= 180) {
      decay = 0.1;
    }
    booked = Math.round(Math.random());
    userId = Math.floor(Math.random() * 500000);

    if ((booked * decay) <= popularityRates[popularity]) {
      daysRate = Math.round(Math.random() * 20);
      if (days === 20) {
        days = Math.floor(Math.random() * (14 - 7)) + 7;
      } else {
        days = bookedDays[daysRate];
      }

      date2 = moment(date1).add(days, 'days');
      month += days;

      reservation = {
        'listings_id': id,
        'start_date': moment(date1).format(),
        'end_date': moment(date2).format(),
        'user_id': userId
      };

      output.push(reservation);
      date1 = moment(date2);

    } else {
      date1 = moment(date1).add(1, 'days');
    }
  };

  // console.log(output);
  callback(output);
  return output;
};


var seedTable = function(array) {
  // console.log('this ran too');
  Reservations.bulkCreate(array)
    .then(() => {
      console.log('success!')
    })
    .catch(() => {
      console.log('something is fucky')
    })
};

// console.log(typeof Reservations);

getDocs(example_ids[7], seedTable);

// console.log(example_ids[0]);
