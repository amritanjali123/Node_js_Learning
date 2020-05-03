'use strict';
module.exports = (sequelize, Sequelize) => {
  const Dashboard = sequelize.define('Dashboard', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    college: {
      type: Sequelize.STRING,
      allowNull: false
    },
    trade: {
      type: Sequelize.STRING,
      allowNull: false
    },
    add: {
      type: Sequelize.JSONB,
      allowNull: false
    },
    regNo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    roll: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {});
  Dashboard.associate = function (DB) {
    Dashboard.belongsTo(DB.User);  // { foreignKey: "email", targetKey: "email" }
  };
  return Dashboard;
};