const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_name: { type: DataTypes.STRING },
});

module.exports = Category;
