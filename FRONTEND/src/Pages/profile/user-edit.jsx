/* eslint-disable jsx-a11y/img-redundant-alt */
import Header from "../../home/header";
import Footer from "../../home/footer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../../redux/apiCalls/userApiCall";
import { fetchReservations } from "../../redux/apiCalls/reservationApiCall";

const UserEdit = () => {
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservation);
  const { user } = useSelector((state) => state.auth);

  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  useEffect(() => {
    // Filtrer les réservations liées à l'utilisateur
    const filteredReservations = reservations.filter(
      (reservation) => reservation.client.toString() === user._id
    );
    setUserReservations(filteredReservations);
  }, [reservations, user._id]);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
  });
  const [showReservations, setShowReservations] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(user._id, formData));
  };

  const handleReservationClick = () => {
    setShowReservations(!showReservations);
  };

  return (
    <>
      <Header />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Edit user</h2>
              </div>
            </div>

            <div className="col-12">
              <div className="profile__content">
                <div className="profile__user">
                  <div className="profile__avatar">
                    <img
                      className="main__table-img"
                      src={user.profilePhoto.url}
                      alt="User image"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="profile__meta profile__meta--green">
                    <h3>
                      User Name: {user.username} <span>(client)</span>
                    </h3>
                    <span>Cinema ID: {user._id}</span>
                  </div>
                </div>

                <ul
                  className="nav nav-tabs profile__tabs"
                  id="profile__tabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-toggle="tab"
                      to="#tab-1"
                      role="tab"
                      aria-controls="tab-1"
                      aria-selected="true"
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleReservationClick}>
                      Reservation
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-toggle="tab"
                      to="#tab-3"
                      role="tab"
                      aria-controls="tab-3"
                      aria-selected="false"
                    >
                      Hestorique
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {!showReservations ? (
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="tab-1"
                role="tabpanel"
                aria-labelledby="1-tab"
              >
                <div className="col-12">
                  <div className="sign__wrap">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <form
                          onSubmit={handleSubmit}
                          className="sign__form sign__form--profile sign__form--first"
                        >
                          <div className="row">
                            <div className="col-12">
                              <h4 className="sign__title">Profile details</h4>
                            </div>

                            <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                              <div className="sign__group">
                                <label
                                  className="sign__label"
                                  htmlFor="username"
                                >
                                  First Name
                                </label>
                                <input
                                  id="username"
                                  type="text"
                                  name="username"
                                  value={formData.username}
                                  onChange={handleChange}
                                  className="sign__input"
                                  placeholder={user.username}
                                />
                              </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                              <div className="sign__group">
                                <label className="sign__label" htmlFor="bio">
                                  Last Name
                                </label>
                                <input
                                  id="bio"
                                  type="text"
                                  name="bio"
                                  value={formData.bio}
                                  onChange={handleChange}
                                  className="sign__input"
                                  placeholder={user.bio}
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <button className="sign__btn" type="submit">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="col-12 col-lg-6">
                        <form className="sign__form sign__form--profile">
                          <div className="row">
                            <div className="col-12">
                              <h4 className="sign__title">Change password</h4>
                            </div>

                            <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                              <div className="sign__group">
                                <label
                                  className="sign__label"
                                  htmlFor="oldPassword"
                                >
                                  Old password
                                </label>
                                <input
                                  id="oldPassword"
                                  type="password"
                                  name="oldPassword"
                                  value={formData.oldPassword}
                                  onChange={handleChange}
                                  className="sign__input"
                                />
                              </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                              <div className="sign__group">
                                <label
                                  className="sign__label"
                                  htmlFor="newPassword"
                                >
                                  New password
                                </label>
                                <input
                                  id="newPassword"
                                  type="password"
                                  name="newPassword"
                                  value={formData.newPassword}
                                  onChange={handleChange}
                                  className="sign__input"
                                />
                              </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                              <div className="sign__group">
                                <label
                                  className="sign__label"
                                  htmlFor="confirmPassword"
                                >
                                  Confirm new password
                                </label>
                                <input
                                  id="confirmPassword"
                                  type="password"
                                  name="confirmPassword"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  className="sign__input"
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <button className="sign__btn" type="submit">
                                Change Password
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="reservation-list">
              {userReservations.length > 0 ? (
                <div className="main__table-wrap">
                  <table className="main__table">
                    <thead>
                      <tr>
                        <th>Film</th>
                        <th>Salle</th>
                        <th>Horaire</th>
                        <th>Places Réservées</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userReservations.map((reservation) => (
                        <tr key={reservation._id}>
                          <td>
                            <div className="main__table-text">
                              {reservation.seance.film.title}
                            </div>
                          </td>
                          <td>
                            <div className="main__table-text">
                              {reservation.seance.salle.nom}
                            </div>
                          </td>
                          <td>
                            <div className="main__table-text">
                              {new Date(
                                reservation.seance.horaire
                              ).toLocaleString()}
                            </div>
                          </td>
                          <td>
                            <div className="main__table-text">
                              {reservation.places}
                            </div>
                          </td>
                          <td>
                            <div className="main__table-btns">
                              <Link
                                to="#modal-view"
                                class="main__table-btn main__table-btn--view open-modal"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"></path>
                                </svg>
                              </Link>

                              <Link
                                to="#modal-delete"
                                class="main__table-btn main__table-btn--delete open-modal"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"></path>
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Aucune réservation trouvée.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserEdit;
