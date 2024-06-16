const ApiError = require("../error/ApiError");
const Network = require("../models/Network.model");
const Person = require("../models/Person.model");

class NetworkController {
  async createNetwork(req, res, next) {
    const { network_name } = req.body;
    try {
      const newNetwork = await Network.create({
        network_name,
      });
      return res.json(newNetwork);
    } catch (error) {
      console.error("Не удалось добавить:", error);
      return next(ApiError.internal("Не удалось добавить"));
    }
  }
  async getNetworks(req, res, next) {
    try {
      const networks = await Network.findAll();
      return res.json(networks);
    } catch (error) {
      console.error("Error fetching region:", error);
      return next(ApiError.internal("Ошибка загрузки person"));
    }
  }
  async getOneNetworks(req, res, next) {
    const network_id = req.params.id;
    try {
      const network = await Network.findByPk(network_id);
      if (network) {
        return res.json(network);
      } else {
        return res.status(404).json({ error: "network не найден" });
      }
    } catch (error) {
      console.error("Error fetching region:", error);
      return next(ApiError.internal("Ошибка загрузки network"));
    }
  }
  async updateNetwork(req, res, next) {
    try {
      const networkId = req.params.id;
      const { network_name, followers } = req.body;

      if (!networkId || isNaN(networkId)) {
        return res.json("Неправильный ID социальной сети");
      }

      if (!network_name && !followers) {
        return next(ApiError.badRequest("Не указаны данные для обновления"));
      }

      const network = await Network.findByPk(networkId);

      if (!network) {
        return res.json("Социальная сеть не найдена");
      }

      if (network_name) {
        network.network_name = network_name;
      }
      if (followers) {
        network.followers = followers;
      }

      await network.save();

      res.json({
        message: "Данные социальной сети успешно обновлены",
        network,
      });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal(`Ошибка сервера: ${error}`));
    }
  }
  async deleteNetwork(req, res, next) {
    try {
      const networkId = req.params.id;

      if (!networkId || isNaN(networkId)) {
        return res.json("Неправильный networkId");
      }

      const deletedNetwork = await Person.destroy({
        where: {
          network_id: networkId,
        },
      });

      if (deletedNetwork === 0) {
        return res.json("Социальная сеть не найдена");
      }

      res.json({ message: "Социальная сеть успешно удалена" });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal(`Ошибка сервера: ${error}`));
    }
  }
}
module.exports = new NetworkController();
