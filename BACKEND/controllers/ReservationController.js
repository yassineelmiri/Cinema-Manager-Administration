const nodemailer = require("nodemailer");
const Reservation = require("../models/Reservation");

exports.makeReservation = async (req, res) => {
  const { seance, places, client } = req.body;
  try {
    const reservation = new Reservation({
      client,
      seance,
      places,
    });
    await reservation.save();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "miriyassine123@gmail.com",
      subject: "Confirmation de votre réservation",
      html: `<p>Votre réservation a été confirmée !</p>
                   <p>Détails de la réservation :</p>
                   <p>Seance: ${seance}</p>
                   <p>Nombre de places: ${places}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Erreur lors de la réservation:", error);
    res.status(500).json({ message: "Erreur du serveur", error: error.message });
  }
};

// Suppression d'une réservation
exports.cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    await Reservation.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'annulation de la réservation",
      error: error.message,
    });
  }
};

// Mise à jour d'une réservation
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { seance, places } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { seance, places },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la réservation",
      error: error.message,
    });
  }
};

// Récupération des réservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: "seance",
        populate: [
          { path: "film", model: "Post" },
          { path: "salle", model: "Salle" },
        ],
      });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations",
      error: error.message,
    });
  }
};
