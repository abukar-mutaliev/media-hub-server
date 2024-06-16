const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiError = require("../error/ApiError");
const Partner = require("../models/Partner.model");

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: "24h" });
};
class partnerController {
  async getAllPartners(req, res, next) {
    try {
      const partners = await Partner.findAll();
      return res.json(partners);
    } catch (error) {
      console.error("Error fetching region:", error);
      return next(ApiError.badRequest("Ошибка загрузки пользователя"));
    }
  }

  async registrationPartner(req, res, next) {
    try {
      const {
        partner_name,
        email,
        password,
        partner_surname,
        promoCode,
        phone,
        network,
      } = req.body;

      if (!email) {
        return next(ApiError.badRequest("Некорректный email"));
      }
      if (!password) {
        return next(ApiError.badRequest("Некорректный password"));
      }
      const existingPartner = await Partner.findOne({ where: { email } });
      if (existingPartner) {
        return res.json("Партнер с таким именем уже существует");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const partner = await Partner.create({
        partner_name,
        partner_surname,
        email,
        password: hashedPassword,
        phone,
        promoCode,
        network,
      });

      const token = generateJwt(partner.partner_id, partner.partner_name);

      res.cookie("partner-token", token, { httpOnly: true, maxAge: 3600000 });

      return res
        .status(201)
        .json({ message: "Партнер успешно зарегистрирован" });
    } catch (error) {
      console.error("Error during registration:", error);
      next(ApiError.internal("Внутренняя ошибка сервера"));
    }
  }

  async loginPartner(req, res, next) {
    const { partner_name, password } = req.body;
    try {
      if (!password) {
        return res.status(401).json("Некорректный password");
      }
      if (!partner_name) {
        return res.status(401).json("Некорректный partner_name");
      }
      const partner = await Partner.findOne({ where: { partner_name } });

      const passwordMatch = await bcrypt.compare(password, partner.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Неверный пароль" });
      }
      const token = generateJwt(partner.partner_id, partner.partner_name);
      return res.json({ token });
    } catch (error) {
      console.error("Ошибка во время входа:", error);
      return next(ApiError.internal("Внутренняя ошибка сервера"));
    }
  }

  async auth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new partnerController();
