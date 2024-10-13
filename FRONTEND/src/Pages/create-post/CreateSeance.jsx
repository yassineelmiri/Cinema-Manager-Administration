import React, { useState } from "react";
import Sidebar from "../Admin/SidebarAdmin";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSeance } from "../../redux/apiCalls/seanceApiCall";
import { fetchSalles } from "../../redux/apiCalls/salleApiCall";
import { fetchPost } from "../../redux/apiCalls/postApiCall";

const CreateSeance = () => {
  const dispatch = useDispatch();

  // States for input fields
  const [film, setFilm] = useState("");
  const [salle, setSalle] = useState("");
  const [horaire, setHoraire] = useState("");
  const [tarif, setTarif] = useState("");

  // Fetching available films and salles from Redux store
  const films = useSelector((state) => state.post.posts); // Adjust according to your slice
  const salles = useSelector((state) => state.salle.salles);

  // Load salles and films when component mounts
  React.useEffect(() => {
    dispatch(fetchSalles());
    dispatch(fetchPost(1)); // Load the first page of films
  }, [dispatch]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // Form validation
    if (!film || !salle || !horaire || !tarif) {
      toast.error("Tous les champs sont requis !");
      return;
    }

    const seanceData = {
      film,
      salle,
      horaire: new Date(horaire),
      tarif: Number(tarif),
    };

    try {
      await dispatch(createSeance(seanceData));
      toast.success("Séance créée avec succès !");
      setFilm("");
      setSalle("");
      setHoraire("");
      setTarif("");
    } catch (error) {
      console.error("Erreur lors de la création de la séance :", error);
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
              <div className="main__title">
                <h2>Ajouter une nouvelle séance</h2>
              </div>
            </div>
            <div className="col-12">
              <form onSubmit={formSubmitHandler} className="form">
                <div className="row">
                  <div className="col-12 col-md-6 form__content">
                    <div className="form__group">
                      <label className="sign__title">Film</label>
                      <select
                        className="form__input"
                        value={film}
                        onChange={(e) => setFilm(e.target.value)}
                      >
                        <option value="">Sélectionner un film</option>
                        {films?.map((filmItem) => (
                          <option key={filmItem._id} value={filmItem._id}>
                            {filmItem.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form__group">
                      <label className="sign__title">Salle</label>
                      <select
                        className="form__input"
                        value={salle}
                        onChange={(e) => setSalle(e.target.value)}
                      >
                        <option value="">Sélectionner une salle</option>
                        {salles?.map((salleItem) => (
                          <option key={salleItem._id} value={salleItem._id}>
                            {salleItem.nom}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form__group">
                      <label className="sign__title">Horaire</label>
                      <input
                        type="datetime-local"
                        className="form__input"
                        value={horaire}
                        onChange={(e) => setHoraire(e.target.value)}
                      />
                    </div>

                    <div className="form__group">
                      <label className="sign__title">Tarif</label>
                      <input
                        type="number"
                        className="form__input"
                        placeholder="Tarif"
                        value={tarif}
                        onChange={(e) => setTarif(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="form__btn">
                      Ajouter la séance
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

export default CreateSeance;
