'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    number: DataTypes.INTEGER,
    credit: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  });

  Card.associate = function(models) {
    Card.belongsTo(models.Customer);
  }

  return Card;
};