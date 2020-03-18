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


// Sample function
var getStayDates = function (INPUT) {
  return ReservationMock.findAll({where: {user_id: INPUT}}).then(function (DATA) {
    return DATA;
  }).catch(() => {
    console.log('your queries suck')
  })
};

//Sample test
describe('gets the reservations for the inputted user', function() {
  it('gets the reservations for the inputted user', function (done) {
    getStayDates(483753).then(function (data) {
      expect(data['start_date']).toBe('2020-09-16');
      expect(data.end_date).toBe('2020-09-23');

      done();
    }).catch(done);
  })
});