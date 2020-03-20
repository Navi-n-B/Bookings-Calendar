//  Helper functions for server-side techniques
const moment = require('moment');

var formatAllRes = function(data) {
  var monthStart, monthEnd, startDate, endDate, output = {};

  for (var i = 0; i < data.length; i++) {
    monthStart = moment(data[i].start_date).format('MMMM');
    monthEnd = moment(data[i].end_date).format('MMMM');

    if (!output[monthStart]) {
      output[monthStart] = {};
    }
    if (!output[monthEnd]) {
      output[monthEnd] = {};
    }

    startDate = moment(data[i].start_date).date();
    endDate = moment(data[i].end_date).date();

    if (monthStart === monthEnd) {
      while (startDate < endDate) {
        output[moment(data[i].start_date).format('MMMM')][startDate] = 1;
        startDate++;
      }
    }

    if (monthStart !== monthEnd) {
      var end = moment(data[i].start_date).daysInMonth();
      for (var k = startDate; k <= end; k++) {
        output[moment(data[i].start_date).format('MMMM')][k] = 1;
      }
      if (endDate > 1) {
        for (var l = 1; l < endDate; l++) {
          output[moment(data[i].end_date).format('MMMM')][l] = 1;
        }
      }
    }

  }

  // console.log(output);
  return output;
};

module.exports.formatAllRes = formatAllRes;