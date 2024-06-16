const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Partner = sequelize.define("partner", {
  partner_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  partner_name: { type: DataTypes.STRING, allowNull: true },
  partner_surname: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone: { type: DataTypes.FLOAT, unique: true, allowNull: false },
  network: { type: DataTypes.STRING, unique: true, allowNull: false },
  promoCode: { type: DataTypes.STRING, unique: true },
});

module.exports = Partner;
