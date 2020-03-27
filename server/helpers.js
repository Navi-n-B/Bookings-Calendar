//  Helper functions for server-side techniques
const moment = require('moment');

var formatAllRes = function(data) {
  var monthStart, monthEnd, startDate, yearStart, end, yearEnd, endDate, output = {};

  for (var i = 0; i < data.length; i++) {
    yearStart = moment(data[i].start_date).format('YYYY');
    yearEnd = moment(data[i].end_date).format('YYYY');
    monthStart = moment(data[i].start_date).format('MMMM');
    monthEnd = moment(data[i].end_date).format('MMMM');


    if (!output[yearStart]) {
      output[yearStart] = {};
    }
    if (!output[yearEnd]) {
      output[yearEnd] = {};
    }
    if (!output[yearStart][monthStart]) {
      output[yearStart][monthStart] = {};
    }
    if (!output[yearEnd][monthStart]) {
      output[yearEnd][monthStart] = {};
    }
    if (!output[yearStart][monthEnd]) {
      output[yearStart][monthEnd] = {};
    }
    if (!output[yearEnd][monthEnd]) {
      output[yearEnd][monthEnd] = {};
    }

    startDate = moment(data[i].start_date).date();
    endDate = moment(data[i].end_date).date();

    if (monthStart === monthEnd) {
      for (var j = startDate; j < endDate; j++) {
        output[yearStart][monthStart][j] = true;
      }
    }

    if (monthStart !== monthEnd) {
      end = moment(data[i].start_date).daysInMonth();
      for (var k = startDate; k <= end; k++) {
        output[yearStart][monthStart][k] = true;
      }
      if (endDate > 1) {
        for (var l = 1; l < endDate; l++) {
          output[yearEnd][monthEnd][l] = true;
        }
      }
    }

  }

  // console.log(output);
  return output;
};

module.exports.formatAllRes = formatAllRes;