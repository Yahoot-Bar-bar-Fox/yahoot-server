'use strict';
module.exports = (sequelize, DataTypes) => {
  class Room extends sequelize.Sequelize.Model {
    static associate(models) {
    }
  }

  Room.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please fill this section"
        },
        notNull: {
          msg: "This section should be exist"
        }
      }
    },
    totalPlayer: DataTypes.INTEGER
  },
  {
    sequelize
  })

  return Room;
};
