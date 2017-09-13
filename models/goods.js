'use strict';
module.exports = function(sequelize, DataTypes) {
  var Goods = sequelize.define('Goods', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Goods;
};