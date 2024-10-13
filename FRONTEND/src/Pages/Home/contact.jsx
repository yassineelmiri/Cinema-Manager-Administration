import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <div className="col-12 col-xl-6">
        <h1 className="section__title section__title--head">Contact Us</h1>
      </div>
      <section className="section section--pb0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-7 col-xl-8">
              <form onSubmit={handleSubmit} className="sign__form--contacts">
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <div className="sign__group">
                      <input
                        type="text"
                        name="name"
                        className="sign__input"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="sign__group">
                      <input
                        type="email"
                        name="email"
                        className="sign__input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="sign__group">
                      <input
                        type="text"
                        name="subject"
                        className="sign__input"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="sign__group">
                      <textarea
                        name="message"
                        className="sign__textarea"
                        placeholder="Type your message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12 col-xl-3">
                    <button type="submit" className="sign__btn">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-5 col-xl-4">
              <h2 className="section__title section__title--sidebar">info </h2>
              <p className="section__text">
                It is a long fact that a reader will be distracted by the
                readable content of a page when looking at its layout.
              </p>
              <ul className="contacts__list">
                <li>
                  <a href="tel:0612441246">+212 612 44 12 46</a>
                </li>
                <li>
                  <a href="mailto:miriyassine@gmail.com">Cenima@gmail.com</a>
                </li>
              </ul>
              <div className="contacts__social">
                <Link to="/" target="_blank">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </Link>
                <Link to="/" target="_blank">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </Link>
                <Link to="/" target="_blank">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
