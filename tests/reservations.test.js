/*
  Simple example test for a database
*/



// set all of your requirements
const Promise = require('bluebird');
var SequelizeMock = require('sequelize-mock');
const db = require('../server/database/index').Reservations;


// Connecting to the fake database
var dbMock = new SequelizeMock();

// Define your Mock objects
  // db.define([tablename, ] defaultValues, options).
var ReservationMock = dbMock.define('reservations_mock', {
  id: 1,
  listings_id: 45673,
  start_date: '2020-09-16',
  end_date: '2020-09-23',
  user_id: 483753
});



var getStayDates = function (INPUT) {
  return ReservationMock.findAll({
    attributes: ['start_date', 'end_date'],
    where: {
      listings_id: INPUT
    },
    raw: true
  })
};

describe('gets the reservations for the inputted listing', function() {
  it('gets the reservations for the inputted listing', function (done) {
    getStayDates(45673).then((data) => {
      expect(data[0].start_date).toBe('2020-09-16');
      expect(data[0].end_date).toBe('2020-09-23');

      done();
    }).catch(done);
  })
});


