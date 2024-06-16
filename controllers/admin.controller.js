const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");
const ApiError = require("../error/ApiError");
const Person = require("../models/Person.model");

const generateJwt = (id, email, isAdmin) => {
  return jwt.sign({ id, email, isAdmin }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

class AdminController {
  async getAllAdmins(req, res, next) {
    try {
      const admins = await Admin.findAll();
      return res.json(admins);
    } catch (error) {
      console.error("Error fetching region:", error);
      return next(ApiError.badRequest("Ошибка загрузки пользователя"));
    }
  }
  async registrationAdmin(req, res, next) {
    try {
      const { email, password, username, isAdmin } = req.body;

      if (!email || !password || !username) {
        return next(ApiError.badRequest("Некорректные данные"));
      }

      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res
          .status(400)
          .json({ message: "Админ с таким email уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = await Admin.create({
        username,
        email,
        isAdmin,
        password: hashedPassword,
      });

      const token = generateJwt(
        newAdmin.user_id,
        newAdmin.email,
        newAdmin.isAdmin
      );

      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

      return res.status(201).json({ message: "Админ успешно зарегистрирован" });
    } catch (error) {
      console.error("Error during registration:", error);
      return next(ApiError.internal("Внутренняя ошибка сервера"));
    }
  }

  async loginAdmin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json({ message: "Некорректные данные" });
      }

      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Неверный email или пароль" });
      }

      const token = generateJwt(admin.user_id, admin.email, admin.isAdmin);

      return res.json({ token });
    } catch (error) {
      console.error("Ошибка во время входа:", error);
      return next(ApiError.internal("Внутренняя ошибка сервера"));
    }
  }

  async deleteAdmin(req, res, next) {
    try {
      const userId = req.params.id;

      if (!userId || isNaN(userId)) {
        return res.json("Неправильный userId");
      }

      const deleteAdmin = await Admin.destroy({
        where: {
          user_id: userId,
        },
      });

      if (deleteAdmin === 0) {
        return res.json("Админ не найден");
      }

      res.json({ message: "Админ успешно удален" });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal(`Ошибка сервера: ${error}`));
    }
  }

  async auth(req, res) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.isAdmin);
      return res.json({ token });
    } catch (error) {
      console.error("Ошибка во время аутентификации:", error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

module.exports = new AdminController();
