const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('quan_ly_ve_xe', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

module.exports = Cart;