const Person = require("./Person.model");
const Region = require("./Region.model");
const Network = require("./Network.model");
const PersonNetworks = require("./PersonNetwork");
const AdPrice = require("./AdPrice.model");

const models = {
  Person,
  Network,
  PersonNetworks,
  Region,
  AdPrice,
};

module.exports = models;
