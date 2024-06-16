const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const Admin = require("../models/Admin.model"); // Убедитесь, что путь к модели правильный

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(ApiError.unauthorized("Не авторизован"));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    const admin = await Admin.findByPk(req.user.id);
    if (!admin || !admin.isAdmin) {
      return next(ApiError.forbidden("Доступ запрещен"));
    }
    next();
  } catch (e) {
    return next(ApiError.unauthorized("Не авторизован"));
  }
};
