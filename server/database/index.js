const Sequelize = require('sequelize');

const database = 'navi';

const sequelize = new Sequelize(database, 'admin1', 'PaSsWoRd', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-3'
  }
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
  },
  discount_week: {
    type: Sequelize.INTEGER
  },
  discount_month: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize,
  modelName: 'Listings'
});


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


module.exports.Listings = Listings;
module.exports.Reservations = Reservations;
