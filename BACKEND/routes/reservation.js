const express = require("express");
const router = express.Router();
const ReservationController = require("../controllers/ReservationController");

// Route pour créer une réservation
router.post("/", ReservationController.makeReservation);

// Route pour supprimer une réservation
router.delete("/:id", ReservationController.cancelReservation);

// Route pour mettre à jour une réservation
router.put("/:id", ReservationController.updateReservation);

// Route pour obtenir toutes les réservations
router.get("/", ReservationController.getReservations);

module.exports = router;
