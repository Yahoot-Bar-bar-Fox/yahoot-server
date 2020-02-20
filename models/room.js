'use strict';
module.exports = (sequelize, DataTypes) => {
  class Room extends sequelize.Sequelize.Model {
    static associate(models) {
    }
  }

  Room.init({
    name: DataTypes.STRING
  }, {
    sequelize
  })

  return Room;
};
