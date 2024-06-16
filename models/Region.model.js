const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const Region = sequelize.define("region", {
  region_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  region_name: { type: DataTypes.STRING },
});

module.exports = Region;
