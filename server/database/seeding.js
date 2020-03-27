const Reservations = require('./index.js').Reservations;
const Listings = require('./index.js').Listings;
const example_ids = require('./listing_ids.js').listings_ids;
const moment = require('moment');
const Sequelize = require('sequelize');
var Promise = require('bluebird');


var popularityRates = { 1: 0.2, 2: 0.3, 3: 0.5, 4: 0.6};
var bookedDays = { 1: 2, 2: 2, 3: 2, 4: 3, 5: 3, 6: 3, 7: 3, 8: 4, 9: 4, 10: 4, 11: 5, 12: 5, 13: 5, 14: 6, 15: 6, 16: 6, 17: 7, 18: 7, 19: 8};
// var count = 0;

var seedReservations = function(id, callback) {
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
      date1 = moment(date1).add(2, 'days');
    }
  };

  // console.log(output);
  callback(output);
  return output;
};


var seedTableRes = function(array) {
  // console.log('this ran too');
  Reservations.bulkCreate(array)
    .catch(() => {
      console.log('something is fucky')
    })
};

// console.log(typeof Reservations);


// console.log(example_ids[0]);

var seedListings = function(id, callback) {
  var listings_id = id;
  var host_id =  Math.floor(Math.random() * 500000);
  var guestSize = Math.round(Math.random() * (12 - 1) + 1);
  var price = Math.floor(Math.random() * (200 - 60) + 60);
  var minimumStay = Math.round(Math.random() * (2 - 1) + 1);
  var refund = Math.round(Math.random())
  var Listing = {};
  var output = [];

  Listing.id = id;
  Listing.host_id= host_id;
  Listing.guest_size= guestSize;
  Listing.price= price;
  Listing.refund= refund;
  Listing.minimum_stay= minimumStay;

  output.push(Listing);

  // console.log(Listing);
  callback(Listing);
  // return output;

};

var seedTableList = function(obj) {
  // console.log('this ran too');
  Listings.create(obj)
    .catch(() => {
      console.log('something is fucky')
    })
};


var seedPrimaryData = function(id) {
  seedReservations(id, seedTableRes);
  seedListings(id, seedTableList);
}

// seedPrimaryData(example_ids[11]);

var seedAll = function(i) {
  var id = example_ids[i];
  if (id) {
    seedPrimaryData(id);
    seedAll(i + 1);
  }
  return;
}


Listings.sync({force: true})
  .then(() => {
    Reservations.sync({force: true})
      .then(() => {
        seedAll(0);
      })
  })