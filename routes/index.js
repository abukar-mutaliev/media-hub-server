const { Router } = require("express");

const router = Router();

router.use("/person", require("./person.route"));

router.use("/region", require("./region.route"));

router.use("/category", require("./categories.route"));

router.use("/network", require("./network.route"));

router.use("/admin", require("./admin.route"));

router.use("/partner", require("./partner.route"));

router.use("/send-email", require("./sendEmail.route"));

router.use("/send-partner-email", require("./sendPartnerEmail.route"));

module.exports = router;
