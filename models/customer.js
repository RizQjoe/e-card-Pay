'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  });

  Customer.associate = function(models) {
    Customer.hasOne(models.Card);
  }
  return Customer;
};
