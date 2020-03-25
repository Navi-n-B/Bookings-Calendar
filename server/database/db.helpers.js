const Reservations = require('./index.js').Reservations;
const Listings = require('./index.js').Listings;


var queryResByListing = function(listing_id) {
  return Reservations.findAll({
    attributes: ['start_date', 'end_date'],
    where: {
      listings_id: listing_id
    },
    raw: true
  })
};

var queryListingsById = function(listing_id) {
  return Listings.findAll({
    where: {
      id: listing_id
    },
    raw: true
  })
};

module.exports.queryResByListing = queryResByListing;
module.exports.queryListingsById = queryListingsById;