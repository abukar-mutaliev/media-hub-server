const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");
const Admin = sequelize.define("admin", {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, isRequired: true },
  password: { type: DataTypes.STRING, isRequired: true },
  email: { type: DataTypes.STRING, isRequired: true, unique: true },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Admin;
