const Region = require("../models/Region.model");
const ApiError = require("../error/ApiError");
class RegionController {
  async createRegion(req, res, next) {
    const { region_name } = req.body;
    try {
      const newRegion = await Region.create({ region_name });
      return res.json(newRegion);
    } catch (error) {
      console.error("Не удалось добавить:", error);
      return next(ApiError.badRequest("Не удалось добавить"));
    }
  }
  async getRegions(req, res) {
    try {
      const regions = await Region.findAll();
      return res.json(regions);
    } catch (error) {
      console.error("Error fetching region:", error);
      return res.json("Ошибка загрузки регионов");
    }
  }

  async getOneRegion(req, res, next) {
    const region_id = req.params.id;
    try {
      const region = await Region.findByPk(region_id);

      if (region) {
        return res.json(region);
      } else {
        return res.status(404).json({ error: "Регион не найден" });
      }
    } catch (error) {
      console.error("Error fetching region:", error);
      return next(ApiError.badRequest("Ошибка загрузки региона"));
    }
  }
  async updateRegion(req, res, next) {
    try {
      const regionId = req.params.id;
      const { region_name } = req.body;

      if (!regionId || isNaN(regionId)) {
        return res.json("Неправильный ID региона");
      }

      if (!region_name) {
        return res.json("Не указаны данные для обновления");
      }

      const region = await Region.findByPk(regionId);

      if (!region) {
        return res.json("Регион не найден");
      }

      if (region_name) {
        region.region_name = region_name;
      }

      await region.save();

      res.json({ message: "Данные региона успешно обновлены", region });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal(`Ошибка сервера: ${error}`));
    }
  }
  async deleteRegion(req, res, next) {
    try {
      const regionId = req.params.id;

      if (!regionId || isNaN(regionId)) {
        return res.json("Неправильный regionId");
      }

      const deleteRegion = await Region.destroy({
        where: {
          region_id: regionId,
        },
      });

      if (deleteRegion === 0) {
        return res.json("Регион не найден");
      }

      res.json({ message: "Регион успешно удален" });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal(`Ошибка сервера: ${error}`));
    }
  }
}
module.exports = new RegionController();
