const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

class PersonNetwork extends Model {}

PersonNetwork.init(
  {
    personPersonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Person",
        key: "person_id",
      },
    },
    networkNetworkId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Network",
        key: "network_id",
      },
    },
    followers: DataTypes.INTEGER,
    network_name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "PersonNetwork",
  }
);

module.exports = PersonNetwork;
