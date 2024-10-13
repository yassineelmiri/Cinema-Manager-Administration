import React, { useState } from "react";
import Sidebar from "../Admin/SidebarAdmin";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { createSalle } from "../../redux/apiCalls/salleApiCall"; // Assurez-vous d'avoir cette fonction

const CreateSalle = () => {
  const dispatch = useDispatch();
  const [nom, setNom] = useState("");
  const [capacite, setCapacite] = useState("");
  const [typeSalle, setTypeSalle] = useState("Standard");

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!nom || !capacite || !typeSalle) {
      toast.error("Tous les champs sont requis !");
      return;
    }

    const salleData = {
      nom,
      capacite: Number(capacite), // Convertir la capacité en nombre
      typeSalle,
    };

    try {
      await dispatch(createSalle(salleData)); // Pas besoin d'attendre la structure de la réponse
      toast.success("Salle créée avec succès !");
      setNom("");
      setCapacite("");
      setTypeSalle("Standard");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la création de la salle !"
      );
    }
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <Sidebar />
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <form onSubmit={formSubmitHandler} className="form">
                <div className="col-12">
                  <div className="main__title">
                    <h2>Ajouter une nouvelle salle</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-5 form__cover"></div>

                  <div className="col-12 form__content">
                    <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div className="form__group">
                        <input
                          type="text"
                          className="form__input"
                          placeholder="Nom de la salle"
                          name="nom"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div className="form__group">
                        <input
                          type="number"
                          className="form__input"
                          placeholder="Capacité"
                          name="capacite"
                          value={capacite}
                          onChange={(e) => setCapacite(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                      <div className="form__group">
                        <select
                          className="form__input"
                          id="typeSalle"
                          name="typeSalle"
                          value={typeSalle}
                          onChange={(e) => setTypeSalle(e.target.value)}
                        >
                          <option value="Standard">Standard</option>
                          <option value="VIP">VIP</option>
                          <option value="IMAX">IMAX</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="form__btn">
                      Ajouter Salle
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateSalle;
