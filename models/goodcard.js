'use strict';
module.exports = function(sequelize, DataTypes) {
  var GoodCard = sequelize.define('GoodCard', {
    GoodId: DataTypes.INTEGER,
    CardId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GoodCard;
};