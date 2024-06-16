const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(ApiError.badRequest("Не авторизован"));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return next(ApiError.badRequest("Не авторизован"));
  }
};
