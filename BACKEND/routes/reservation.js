const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/ReservationController");

router.post("/",  ReservationController.makeReservation);
router.delete("/:id", ReservationController.cancelReservation);
router.get("/",  ReservationController.getReservations);

module.exports = router;
