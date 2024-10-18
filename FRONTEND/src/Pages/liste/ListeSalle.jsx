import React, { useState, useEffect } from "react";
import Sidebar from "../Admin/SidebarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalles, deleteSalle } from "../../redux/apiCalls/salleApiCall";
import { Link } from "react-router-dom";

const ListSalle = () => {
  const dispatch = useDispatch();
  const salles = useSelector((state) => state.salle.salles);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentSalle, setCurrentSalle] = useState(null);
  useEffect(() => {
    dispatch(fetchSalles());
  }, [dispatch]);

  const handleDelete = (salleId) => {
    if (window.confirm("Are you sure you want to delete this salle?")) {
      dispatch(deleteSalle(salleId));
    }
  };

  const handleUpdateClick = (salle) => {
    setCurrentSalle(salle);
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
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
                <h2>Liste des Salles</h2>
                <span className="main__title-stat">{salles.length} total</span>
              </div>
            </div>

            <div className="col-12">
              <div className="main__table-wrap">
                <table className="main__table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOM</th>
                      <th>CAPACITÉ</th>
                      <th>TYPE DE SALLE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salles.map((salle) => (
                      <tr key={salle._id}>
                        <td>
                          <div className="main__table-text">
                            #{salle._id.substring(4, 7)}...
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">{salle.nom}</div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {salle.capacite}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {salle.typeSalle}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-btns">
                            <Link
                              to="#"
                              onClick={() => handleUpdateClick(salle)}
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
                              onClick={() => handleDelete(salle._id)}
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
            <h3 className="modal__title">Modifier Salle</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                className="form__input"
                value={currentSalle?.nom || ""}
                onChange={(e) =>
                  setCurrentSalle({ ...currentSalle, nom: e.target.value })
                }
                placeholder="Nom de la salle"
              />
              <input
                type="number"
                className="form__input"
                value={currentSalle?.capacite || ""}
                onChange={(e) =>
                  setCurrentSalle({ ...currentSalle, capacite: e.target.value })
                }
                placeholder="Capacité"
              />
              <select
                className="form__input"
                value={currentSalle?.typeSalle || ""}
                onChange={(e) =>
                  setCurrentSalle({
                    ...currentSalle,
                    typeSalle: e.target.value,
                  })
                }
              >
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="3D">3D</option>
              </select>
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

export default ListSalle;
