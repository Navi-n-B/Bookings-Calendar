const Sequelize = require('sequelize');
const sequelize = new Sequelize('navi', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

const Model = Sequelize.Model;
class Listings extends Model {};
Listings.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  host_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  guest_size: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  refund: {
    type: Sequelize.INTEGER
  },
  minimum_stay: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Listings'
});

// Listings.init({
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   host_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   title: {
//     type: Sequelize.STRING
//   },
//   description: {
//     type: Sequelize.TEXT
//   },
//   location: {
//     type: Sequelize.STRING
//   },
//   guest_size: {
//     type: Sequelize.INTEGER
//   },
//   bedroom_count: {
//     type: Sequelize.INTEGER
//   },
//   bed_count: {
//     type: Sequelize.INTEGER
//   },
//   bath_count: {
//     type: Sequelize.INTEGER
//   },
//   amenities: {
//     type: Sequelize.STRING
//   },
//   accessibilities: {
//     type: Sequelize.STRING
//   },
//   sleeping_arrangements: {
//     type: Sequelize.STRING
//   },
//   price: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   refund: {
//     type: Sequelize.INTEGER
//   },
//   minimum_stay: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   },
//   minimum_stay_type: {
//     type: Sequelize.INTEGER
//   }
// }, {
//   sequelize,
//   modelName: 'Listings'
// });

// Listings.sync({force: true});

class Reservations extends Model {};
Reservations.init({
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  listings_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATEONLY
  },
  end_date: {
    type: Sequelize.DATEONLY
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'reservations'
});

// Reservations.sync();
// Reservations.sync({force: true});


module.exports.Listings = Listings;
module.exports.Reservations = Reservations;