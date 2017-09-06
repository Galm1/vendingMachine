'use strict';
module.exports = function(sequelize, DataTypes) {
  var purchase = sequelize.define('purchase', {
    name: DataTypes.STRING,
    amountIn: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return purchase;
};