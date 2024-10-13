import React from "react";
import logo from "../../assets/img/series/logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <header className="header">
        <div className="header__content">
          <a href="/" className="header__logo">
            <img src={logo} alt="logo" />
          </a>
          <button className="header__btn" type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="sidebar">
        <a href="/" className="sidebar__logo">
          <img src={logo} alt="logo" />
        </a>

        <div className="sidebar__user">
          <div className="sidebar__user-img">
            <img src={user?.profilePhoto.url } alt="photo_profil" />
          </div>
          <div className="sidebar__user-title">
            <span>{user?.isAdmin ? "Admin" : "User"}</span>
            <p>{user?.username || "Anonymous"}</p>
          </div>
        </div>

        <ul className="sidebar__nav">
          <li className="sidebar__nav-item">
            <Link
              to="/admin"
              className="sidebar__nav-link sidebar__nav-link--active"
            >
              Statistique
            </Link>
          </li>
          <li className="sidebar__nav-item">
            <Link to="/posts/create-post" className="sidebar__nav-link">
              Ajouter Film
            </Link>
          </li>
          <li className="sidebar__nav-item">
            <Link to="/posts/create-salle" className="sidebar__nav-link">
              Ajouter Salle
            </Link>
          </li>
          <li className="sidebar__nav-item">
            <Link to="/posts/create-seance" className="sidebar__nav-link">
              Ajouter Seance
            </Link>
          </li>
          <li className="sidebar__nav-item">
            <Link to="/list/film" className="sidebar__nav-link">
              Liste Film
            </Link>
          </li>
          <li className="sidebar__nav-item">
            <Link to="/list/salle" className="sidebar__nav-link">
              Liste Salle
            </Link>
          </li>
          <li className="sidebar__nav-item">
            <Link to="/list/Seance" className="sidebar__nav-link">
              Liste Seance
            </Link>
          </li>

        </ul>
      </div>
    </>
  );
};

export default Sidebar;
