const { Router } = require("express");
const registerController  = require("../controllers/partner.controller");
const authenticateToken = require('../middlewares/auth.middleware')

const router = Router();

router.post("/registration", registerController.registrationPartner);

router.post("/login", registerController.loginPartner);

router.get("/auth", authenticateToken, registerController.auth);

router.get("/", registerController.getAllPartners);

module.exports = router;