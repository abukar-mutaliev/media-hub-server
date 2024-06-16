const { Router } = require("express");
const NetworkController  = require("../controllers/network.controller");
const authenticateToken = require('../middlewares/auth.middleware')

const router = Router();

router.post("/",authenticateToken,  NetworkController.createNetwork);

router.get("/:id", NetworkController.getOneNetworks);

router.get("/", NetworkController.getNetworks);

router.put("/:id", authenticateToken, NetworkController.updateNetwork);

router.delete("/:id", authenticateToken, NetworkController.deleteNetwork);

module.exports = router;