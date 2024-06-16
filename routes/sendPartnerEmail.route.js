const { Router } = require("express");

const router = Router();
const SendPartnerEmailController = require("../controllers/sendPartnerEmail.controller");

router.post("/", SendPartnerEmailController.createPartnerEmail);

module.exports = router;
