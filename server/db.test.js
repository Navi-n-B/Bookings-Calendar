// /*
//   Simple example test for a database
// */



// // set all of your requirements
// var SequelizeMock = require('sequelize-mock');
// const db = require(FILL_ME_IN);


// // Connecting to the fake database
// var dbMock = new SequelizeMock();

// // Define your Mock objects
//   // db.define([tablename, ] defaultValues, options).
// var FILL_ME_IN = dbMock.define('TABLE_NAME', {
//   ATTRIBUTE1: VALUE1,
//   ATTRIBUTE2: VALUE2,
//   ATTRIBUTES42: VALUE42
// })


// // Sample function
// db.SAMPLE_FUNCTION = function (INPUT) {
//   return FILL_ME_IN.findAll({
//     where: {
//       id: INPUT
//     }
//   }).then(function (DATA) {
//     return DATA;
//   })
// };

// //Sample test
// describe('SAMPLE_FUNCTION', function() {
//   if('should do SAMPLE_FUNCTION with INPUT and return DATA', function (done) {
//     db.SAMPLE_FUNCTION(INPUT).then(function (DATA) {
//       DATA.should.equal('EXPECTED_INPUT')

//       done();
//     }).catch(done);
//   })
// });