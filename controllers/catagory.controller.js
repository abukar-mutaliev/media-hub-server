const Category = require("../models/Categories.model");
const ApiError = require("../error/ApiError");
class CategoryController {
  async createCategory(req, res, next) {
    const { category_name } = req.body;
    try {
      const newCategory = await Category.create({ category_name });
      return res.json(newCategory);
    } catch (error) {
      console.error("Не удалось добавить:", error);
      return next(ApiError.badRequest("Не удалось добавить"));
    }
  }
  async getCategories(req, res) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (error) {
      console.error("Error fetching Category:", error);
      return res.json("Ошибка загрузки регионов");
    }
  }

  async getOneCategory(req, res, next) {
    const category_id = req.params.id;
    try {
      const category = await Category.findByPk(category_id);
      if (category) {
        return res.json(category);
      } else {
        return res.status(404).json({ error: "Category не найден" });
      }
    } catch (error) {
      console.error("Error fetching Category:", error);
      return next(ApiError.badRequest("Ошибка загрузки региона"));
    }
  }
  async updateCategory(req, res, next) {
    try {
      const categoryId = req.params.id;
      const { category_name } = req.body;

      if (!categoryId || isNaN(categoryId)) {
        return res.json("Неправильный ID категории");
      }

      if (!category_name) {
        return res.json("Не указаны данные для обновления");
      }

      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.json("категория не найдена");
      }

      if (category_name) {
        category.category_name = category_name;
      }

      await category.save();

      res.json({ message: "Данные категории успешно обновлены", category });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal(`Ошибка сервера: ${error}`));
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const categoryId = req.params.id;

      if (!categoryId || isNaN(categoryId)) {
        return res.json("Неправильный categoryId");
      }

      const deleteCategory = await Category.destroy({
        where: {
          category_id: categoryId,
        },
      });

      if (deleteCategory === 0) {
        return res.json("категория не найдена");
      }

      res.json({ message: "категория успешно удалена" });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal(`Ошибка сервера: ${error}`));
    }
  }
}
module.exports = new CategoryController();
