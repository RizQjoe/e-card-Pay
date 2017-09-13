'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    number: DataTypes.INTEGER,
    credit: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Card;
};