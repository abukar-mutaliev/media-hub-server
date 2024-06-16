const { Router } = require("express");
const regionController = require("../controllers/region.controller");
const router = Router();

router.post("/", regionController.createRegion);

router.get("/:id", regionController.getOneRegion);

router.get("/", regionController.getRegions);

router.put("/:id", regionController.updateRegion);

router.delete("/:id", regionController.deleteRegion);

module.exports = router;
