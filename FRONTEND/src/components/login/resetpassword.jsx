import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import { toast } from "react-toastify";

import logo from "../../assets/img/series/logo.png";
import bgImage from "../../assets/img/bg.jpg";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (newPassword.trim() === "") {
      return toast.error("New password is required");
    }

    if (confirmPassword.trim() === "") {
      return toast.error("Please confirm your password");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
  };

  return (
    <div
      className="sign section--full-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
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
                    type="password"
                    className="sign__input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} // Mise à jour du nouveau mot de passe
                  />
                </div>
                <div className="sign__group">
                  <input
                    type="password"
                    className="sign__input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button className="sign__btn" type="submit">
                  Reset Password
                </button>

                <span className="sign__text">
                  Remembered your password? <Link to="/signin">Sign in!</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
