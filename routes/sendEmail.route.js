const { Router } = require("express");
const router = Router();
const SendEmailController = require("../controllers/sendEmail.controller");

router.post("/", SendEmailController.createEmail);

module.exports = router;
