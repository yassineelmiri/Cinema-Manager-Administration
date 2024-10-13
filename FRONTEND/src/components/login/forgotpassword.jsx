import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../assets/css/main.css';
import { toast } from "react-toastify"; // Pour afficher des notifications

import logo from '../../assets/img/series/logo.png'; // Assurez-vous que le chemin est correct
import bgImage from '../../assets/img/bg.jpg'; // Assurez-vous que le chemin est correct

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      return toast.error("Email is required");
    }

    console.log({ email });
    // Vous pouvez ici envoyer la requête pour réinitialiser le mot de passe
  };

  return (
    <div className="sign section--full-bg" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form onSubmit={formSubmitHandler} className="sign__form">
                <Link to="/" className="sign__logo">
                  <img src={logo} alt="Logo" /> {/* Affichage du logo */}
                </Link>
                <div className="sign__group">
                  <input
                    type="email"
                    className="sign__input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état email
                  />
                </div>

                <button className="sign__btn" type="submit">Reset Password</button> {/* Bouton de réinitialisation */}

                <span className="sign__delimiter">or</span>
                <span className="sign__text">
                  Remembered your password? <Link to="/signin">Sign in!</Link> {/* Lien vers la connexion */}
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
