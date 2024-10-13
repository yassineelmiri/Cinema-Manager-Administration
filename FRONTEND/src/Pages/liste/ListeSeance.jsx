import React, { useState, useEffect } from "react";
import Sidebar from "../Admin/SidebarAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeancesByFilmId,
  deleteSeance,
} from "../../redux/apiCalls/seanceApiCall"; // Assurez-vous d'avoir la fonction deleteSeance
import { Link } from "react-router-dom";

const ListeSeance = () => {
  const dispatch = useDispatch();
  const seances = useSelector((state) => state.seance.seances);
  console.log(seances);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentSeance, setCurrentSeance] = useState(null);

  useEffect(() => {
    dispatch(fetchSeancesByFilmId(1));
  }, [dispatch]);

  const handleDelete = (seanceId) => {
    if (window.confirm("Are you sure you want to delete this seance?")) {
      dispatch(deleteSeance(seanceId));
    }
  };

  const handleUpdateClick = (seance) => {
    setCurrentSeance(seance);
    setShowUpdateModal(true); // Ouvre la pop-up de mise à jour
  };

  const closeModal = () => {
    setShowUpdateModal(false); // Ferme la pop-up de mise à jour
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // Logique pour mettre à jour la séance avec les informations modifiées
    // Exécuter la fonction dispatch pour mettre à jour
    closeModal();
  };

  return (
    <div>
      <Sidebar />
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Seance List</h2>
                <span className="main__title-stat">{seances.length} total</span>
              </div>
            </div>

            <div className="col-12">
              <div className="main__table-wrap">
                <table className="main__table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>FILM</th>
                      <th>SALLE</th>
                      <th>Type</th>
                      <th>HORAIRE</th>
                      <th>TARIF</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seances.map((seance) => (
                      <tr key={seance._id}>
                        <td>
                          <div className="main__table-text">
                            #{seance._id.substring(4, 7)}...
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            <Link to={`/posts/details/${seance.film?._id}`}>
                              {seance.film?.title}
                            </Link>
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {seance.salle?.nom}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {seance.salle.typeSalle}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {new Date(seance.horaire).toLocaleString()}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {seance.tarif} MAD
                          </div>
                        </td>
                        <td>
                          <div className="main__table-btns">
                            <Link
                              to="#"
                              onClick={() => handleUpdateClick(seance)}
                              className="main__table-btn main__table-btn--view"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a3,3,0,0,0,0,2.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A3,3,0,0,0,21.92,11.6ZM12,18c-3.18,0-6.17-2.29-7.82-6A13.43,13.43,0,0,1,12,6c3.18,0,6.17,2.29,7.82,6A13.43,13.43,0,0,1,12,18Z" />
                                <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                              </svg>
                            </Link>
                            <Link
                              to="#"
                              onClick={() => handleDelete(seance._id)}
                              className="main__table-btn main__table-btn--delete open-modal"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20,4H17V3a2,2,0,0,0-2-2H9A2,2,0,0,0,7,3V4H4A1,1,0,0,0,4,6H5.08l1.08,13.07A3,3,0,0,0,9.13,22H14.87a3,3,0,0,0,2.97-2.93L18.92,6H20A1,1,0,0,0,20,4ZM9,4h6V3H9ZM16.92,19a1,1,0,0,1-1,.93H9.13a1,1,0,0,1-1-.93L7.08,6H16.92Z" />
                              </svg>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showUpdateModal && (
        <div className="mfp-content">
          <div id="modal-status" className="zoom-anim-dialog modal">
            <h3 className="modal__title">Update Seance</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                className="form__input"
                value={currentSeance?.film?.title}
                onChange={(e) =>
                  setCurrentSeance({
                    ...currentSeance,
                    film: { ...currentSeance.film, title: e.target.value },
                  })
                }
              />
              <input
                type="datetime-local"
                className="form__input"
                value={new Date(currentSeance?.horaire)
                  .toISOString()
                  .substring(0, 16)}
                onChange={(e) =>
                  setCurrentSeance({
                    ...currentSeance,
                    horaire: new Date(e.target.value),
                  })
                }
              />
              <input
                type="number"
                className="form__input"
                value={currentSeance?.tarif}
                onChange={(e) =>
                  setCurrentSeance({ ...currentSeance, tarif: e.target.value })
                }
              />
              <div className="modal__btns">
                <button className="modal__btn modal__btn--apply" type="submit">
                  Update
                </button>
                <button
                  className="modal__btn modal__btn--dismiss"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeSeance;
