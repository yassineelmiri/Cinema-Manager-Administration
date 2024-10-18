import React, { useEffect, useState } from "react";
import Header from "../../home/header";
import Footer from "../../home/footer";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../../redux/apiCalls/postApiCall";
import { fetchSeancesByFilmId } from "../../redux/apiCalls/seanceApiCall";
import { makeReservation } from "../../redux/apiCalls/reservationApiCall";
import AddComment from "../comments/Addcomment";
import CommentList from "../comments/comment-list";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.selectedPost);
  const seances = useSelector((state) => state.seance.seances);
  const [places, setPlaces] = useState(1);
  console.log(seances._id);

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
              <div className="col-12 col-xl-8">
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
                <div className="col-12 col-xl-8">
                  <video
                    controls
                    playsInline
                    poster={post.image.url}
                    id="player"
                    style={{ width: "700px", height: "300px" }}
                  >
                    <source
                      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                      type="video/mp4"
                      size="576"
                    />
                    <source
                      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                      type="video/mp4"
                      size="720"
                    />
                    <source
                      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
                      type="video/mp4"
                      size="1080"
                    />

                    <track
                      kind="captions"
                      label="English"
                      srclang="en"
                      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
                      default
                    />
                    <track
                      kind="captions"
                      label="Français"
                      srclang="fr"
                      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
                    />
                  </video>
                  <a
                    href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                    download
                  >
                    Download
                  </a>
                </div>

                <div className="article__actions article__actions--details">
                  <div className="article__download">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z" />
                    </svg>
                    Download:
                    <Link to="#" download="#">
                      480p
                    </Link>
                    <Link to="#" download="#">
                      720p
                    </Link>
                    <Link to="#" download="#">
                      1080p
                    </Link>
                    <Link to="#" download="#">
                      4k
                    </Link>
                  </div>

                  <button className="article__favorites" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z" />
                    </svg>
                    Add to favorites
                  </button>
                </div>

                <hr />
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
                                Number of Seats:
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
                                if (places <= seance.salle.capacite) {
                                  handleReservation(seance._id);
                                } else {
                                  alert(
                                    `Le nombre de places sélectionné dépasse la capacité de la salle (${seance.salle.capacite} places).`
                                  );
                                }
                              }}
                            >
                              Reserver
                            </button>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                <hr />

                <div>
                  <AddComment postId={post._id} />
                  <CommentList postId={post._id} />
                </div>
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
