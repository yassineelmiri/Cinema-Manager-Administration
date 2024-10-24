const express = require("express");
const path = require('path');
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectToDb = require("./config/connectToDb");

// Importation des routes
const salleRoutes = require("./routes/salle");
const usersRoute = require("./routes/usersRoute");
const seanceRoutes = require("./routes/seance");
const reservationRoutes = require("./routes/reservation");
const authRoute = require("./routes/authRoute");
const postsRoutes = require("./routes/postsRoute");
const commentsRoute = require("./routes/commentsRoute");

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
ConnectToDb();

const app = express();

// Servir les images statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware pour parser le JSON
app.use(express.json());

// CORS policy
app.use(cors({
  origin: "http://localhost:3000"
}));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoutes);
app.use("/api/salles", salleRoutes);
app.use("/api/comments", commentsRoute);
app.use("/api/seances", seanceRoutes);
app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
