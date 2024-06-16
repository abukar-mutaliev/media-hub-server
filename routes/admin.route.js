const { Router } = require("express");
const registerController = require("../controllers/admin.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const checkAdmin = require("../middlewares/checkAdminMiddleware");

const router = Router();

router.get("/all", authenticateToken, registerController.getAllAdmins);

router.post(
  "/registration",

  registerController.registrationAdmin
);

router.post("/login", registerController.loginAdmin);

router.get("/auth", authenticateToken, registerController.auth);

router.delete("/:id", checkAdmin, registerController.deleteAdmin);

module.exports = router;
