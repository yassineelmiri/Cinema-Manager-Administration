const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  seance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seance",
    required: true,
  },
  places: { type: Number, required: true },
});

module.exports = mongoose.model("Reservation", reservationSchema);
