const { Router } = require("express");
const categoryController = require("../controllers/catagory.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const router = Router();

router.post("/", categoryController.createCategory);

router.get("/:id", categoryController.getOneCategory);

router.get("/", categoryController.getCategories);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
