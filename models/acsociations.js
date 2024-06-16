const Person = require("./Person.model");
const Network = require("./Network.model");
const PersonNetwork = require("./PersonNetwork");
const AdPrice = require("./AdPrice.model");

Person.belongsToMany(Network, {
  through: PersonNetwork,
  foreignKey: "personPersonId",
  otherKey: "networkNetworkId",
});

Network.belongsToMany(Person, {
  through: PersonNetwork,
  foreignKey: "networkNetworkId",
  otherKey: "personPersonId",
});

Person.hasOne(AdPrice, { foreignKey: "personId" });
AdPrice.belongsTo(Person, { foreignKey: "personId" });
