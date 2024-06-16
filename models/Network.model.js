const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

class Network extends Model {}

Network.init(
  {
    network_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    network_name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Network",
  }
);

module.exports = Network;
