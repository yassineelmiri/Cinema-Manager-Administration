const express = require("express");
const router = express.Router();
const SalleController = require("../controllers/SalleController");

router.post("/", SalleController.addSalle);
router.get("/", SalleController.getSalles);
router.put("/:id", SalleController.updateSalle);
router.delete("/:id", SalleController.deleteSalle);
router.get("/count", SalleController.getSalleCount);

module.exports = router;
