'use strict';
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function (models) {
    User.hasOne(models.Dashboard)  //{ primaryKey: "email", targetKey: "email" }
  };
  return User;
};