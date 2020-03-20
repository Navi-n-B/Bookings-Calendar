const Reservations = require('./index.js').Reservations;


var queryResByListing = function(listing_id) {
  return Reservations.findAll({
    attributes: ['start_date', 'end_date'],
    where: {
      listings_id: listing_id
    },
    raw: true
  })
};

module.exports.queryResByListing = queryResByListing;