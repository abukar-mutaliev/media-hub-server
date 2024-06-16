const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const PersonNetwork = require("./PersonNetwork");
const Network = require("./Network.model");
const AdPrice = require("./AdPrice.model");

class Person extends Model {}

Person.init(
  {
    person_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    person_name: DataTypes.STRING,
    person_description: DataTypes.TEXT,
    activity: DataTypes.STRING,
    achievements: DataTypes.STRING,
    regionRegionId: DataTypes.INTEGER,
    categoryCategoryId: DataTypes.INTEGER,
    person_photo: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Person",
  }
);

Person.belongsToMany(Network, {
  through: PersonNetwork,
  foreignKey: "personPersonId",
  otherKey: "networkNetworkId",
});

Person.hasOne(AdPrice, {
  foreignKey: {
    name: "personId",
    onDelete: "CASCADE",
  },
});
module.exports = Person;
