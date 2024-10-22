import React, { useEffect, useState } from "react";
import Header from "../../home/header";
import Footer from "../../home/footer";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  toggleLikePost,
} from "../../redux/apiCalls/postApiCall";
import { fetchSeancesByFilmId } from "../../redux/apiCalls/seanceApiCall";
import { makeReservation } from "../../redux/apiCalls/reservationApiCall";
import AddComment from "../comments/Addcomment";
import CommentList from "../comments/comment-list";
import { fetchReservations } from "../../redux/apiCalls/reservationApiCall";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservation);
  const [userReservations, setUserReservations] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.selectedPost);
  const seances = useSelector((state) => state.seance.seances);

  const [places, setPlaces] = useState(1);
  const [showVideo, setShowVideo] = useState(true); // État pour afficher la vidéo
  const [showSeances, setShowSeances] = useState(false); // État pour afficher les séances

  const handleLike = () => {
    dispatch(toggleLikePost(post._id));
  };

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  useEffect(() => {
    const filteredReservations = reservations.filter(
      (reservation) => reservation.client.toString() === user._id
    );
    setUserReservations(filteredReservations);
  }, [reservations, user._id]);

  useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchSeancesByFilmId(id));
  }, [dispatch, id]);

  const handleReservation = (seanceId) => {
    const reservationData = {
      client: user?._id,
      seance: seanceId,
      places: places,
    };

    dispatch(makeReservation(reservationData));
  };

  if (!post) {
    return <p>No post found</p>;
  }

  return (
    <>
      <Header />
      <section className="section section--head section--head-fixed section--gradient section--details-bg">
        <div
          className="section__bg"
          style={{
            backgroundImage: `url(${post.image.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container">
          <div className="article">
            <div className="row">
              <div className="col-12 col-xl-12">
                <Link
                  to={post.trailerUrl ? post.trailerUrl : "#"}
                  className="article__trailer open-video"
                >
                  Trailer
                </Link>

                <div className="article__content">
                  <h1>Film # {post.title}</h1>
                  <ul className="list">
                    <li>{post.category || "No rating available"}</li>
                    <li>{post.list?.join(", ") || "No list items"}</li>
                  </ul>

                  <p>
                    Description:{" "}
                    {post.description || "No description available"}
                  </p>
                </div>

                <hr />
                
                {/* Boutons pour basculer entre vidéo et séances */}
                <div className="profile">
                  <div className="nav nav-tabs profile__tabs">
                  <button className="article__btn" onClick={() => { setShowVideo(true); setShowSeances(false); }}>
                    Afficher Film
                  </button>
                  <button className="article__btn"  onClick={() => { setShowVideo(false); setShowSeances(true); }}>
                    Afficher Séances
                  </button>
                  </div>
                </div>

                {/* Section Vidéo + Commentaires */}
                {showVideo && (
                  <>
                    <div className="col-12 col-xl-8">
                      <video
                        controls
                        playsInline
                        poster={post.image.url}
                        id="player"
                        style={{ width: "900px", height: "400px" }}
                        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                      ></video>
                    </div>
                    <div className="article__actions article__actions--details">
                  <div className="article__download">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    ></svg>
                    Download:
                    <Link
                      to="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                      download
                    >
                      480p
                    </Link>
                    <Link
                      to="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                      download
                    >
                      720p
                    </Link>
                    <Link
                      to="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                      download
                    >
                      1080p
                    </Link>
                    <Link
                      to="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                      download
                    >
                      4k
                    </Link>
                  </div>

                  <button
                    className="article__favorites"
                    type="button"
                    onClick={handleLike}
                  >
                    {post.likes.includes(user._id)
                      ? "Remove from favorites"
                      : "Add to favorites"}
                  </button>
                </div>
                <hr />

                    <div className="article__content">
                      <h1 className="article__trailer">Commentaires :</h1>
                      <AddComment postId={post._id} />
                      <CommentList userId={user._id} postId={post._id} />
                    </div>
                  </>
                )}

                {/* Section Séances Disponibles */}
                {showSeances && (
                  <div className="article__content">
                    <h2>Available Seances</h2>
                    <div className="seances-list">
                      {seances.length === 0 ||
                      !seances.some((seance) => seance.film._id === post._id) ? (
                        <p>No seances available</p>
                      ) : (
                        seances
                          .filter((seance) => seance.film._id === post._id)
                          .map((seance) => (
                            <div key={seance._id} className="seance-card">
                              <p className="seance-info">
                                <strong>Salle:</strong> {seance.salle.nom}
                              </p>
                              <hr />
                              <p className="seance-info">
                                <strong>Capacité:</strong> {seance.salle.capacite}
                              </p>
                              <hr />
                              <p className="seance-info">
                                <strong>Horaire:</strong>{" "}
                                {new Date(seance.horaire).toLocaleString()}
                              </p>
                              <hr />
                              <p className="seance-info">
                                <strong>Tarif:</strong> {seance.tarif} MAD
                              </p>
                              <hr />
                              <div>
                                <h4 htmlFor={`places-${seance._id}`}>
                                  Nombre de Places:
                                </h4>
                                <input
                                  type="number"
                                  id={`places-${seance._id}`}
                                  value={places}
                                  onChange={(e) => setPlaces(e.target.value)}
                                  min="1"
                                  max={seance.salle.capacite}
                                  className="header__form-input"
                                />
                              </div>
                              <hr />
                              <button
                                className="sign__btn"
                                onClick={() => {
                                  if (places <= 0) {
                                    alert(
                                      "Veuillez sélectionner au moins une place."
                                    );
                                    return;
                                  }
                                  if (places > seance.salle.capacite) {
                                    alert(
                                      `Le nombre de places sélectionné dépasse la capacité de la salle (${seance.salle.capacite} places).`
                                    );
                                    return;
                                  }
                                  if (userReservations.length >= places) {
                                    alert(
                                      "Vous avez déjà réservé le nombre maximum de places disponibles."
                                    );
                                    return;
                                  }
                                  handleReservation(seance._id);
                                  alert("Réservation réussie !");
                                }}
                              >
                                Réserver
                              </button>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                )}

                <hr />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PostDetail;
