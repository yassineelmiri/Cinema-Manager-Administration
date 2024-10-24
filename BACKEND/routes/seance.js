const express = require("express");
const router = express.Router();
const SeanceController = require("../controllers/SeanceController");


router.post("/", SeanceController.addSeance);
router.get("/", SeanceController.getSeances);
router.get("/:id", SeanceController.getSingleSeancesCtrl);
router.put("/:id", SeanceController.updateSeance);
router.delete("/:id", SeanceController.deleteSeance);

module.exports = router;
