import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import { toast } from "react-toastify";

import logo from "../../assets/img/series/logo.png";
import bgImage from "../../assets/img/bg.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return toast.error("Email is required");
    }

    console.log({ email });
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
                  <img src={logo} alt="Logo" /> 
                </Link>
                <div className="sign__group">
                  <input
                    type="email"
                    className="sign__input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <button className="sign__btn" type="submit">
                  Reset Password
                </button>{" "}
                <span className="sign__delimiter">or</span>
                <span className="sign__text">
                  Remembered your password? <Link to="/signin">Sign in!</Link>{" "}
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
