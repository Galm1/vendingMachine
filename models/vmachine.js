'use strict';
module.exports = function(sequelize, DataTypes) {
  var VMachine = sequelize.define('VMachine', {
    name: DataTypes.STRING,
    cost: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    discription: DataTypes.STRING,
    productValue: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return VMachine;
};
