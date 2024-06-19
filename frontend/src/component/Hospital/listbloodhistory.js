import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

const ListBloodHistory = () => {
  const [bloodList, setBloodList] = useState([]); // Liste de sang
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // État du modal d'ajout
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // État du modal de mise à jour
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // État du modal d'historique
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // État du modal de détails
  const [newBlood, setNewBlood] = useState({ blood_type: "", quantity_ml: "" }); // Nouvel élément à ajouter
  const [updateBlood, setUpdateBlood] = useState({ id: null, quantity_change: "" }); // Élément à mettre à jour
  const [bloodHistory, setBloodHistory] = useState([]); // Historique des changements
  const [selectedDetail, setSelectedDetail] = useState(null); // Détail sélectionné pour le modal de détails

  // Fonction pour récupérer la liste de sang
  const fetchBloodList = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const response = await axios.get("http://localhost:8000/hospitals/list_blood_stock/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBloodList(response.data);
    } catch (error) {
      console.error("Error fetching blood list: ", error.message);
    }
  };

  // Fonction pour récupérer l'historique des modifications
  const fetchBloodHistory = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const response = await axios.get("http://localhost:8000/hospitals/list_blood_history/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Blood history data:", response.data);
      setBloodHistory(response.data);
    } catch (error) {
      console.error("Error fetching blood history: ", error.message);
    }
  };


  // Appel de fetchBloodList une fois après le rendu initial
  useEffect(() => {
    fetchBloodList();
  }, []);

  // Fonction pour ajouter un nouvel élément à la liste
  const handleAddBlood = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      const user = await axios.get("http://localhost:8000/user/profile/", config);
      const userId = user.data.id;
      const newBloodWithUserId = { ...newBlood, user_id: userId };
      await axios.post("http://localhost:8000/hospitals/add_blood_stock/", newBloodWithUserId, config);
      fetchBloodList(); // Actualiser la liste après l'ajout
      setIsAddModalOpen(false); // Fermer le modal d'ajout
    } catch (error) {
      console.error("Error adding blood: ", error.message);
    }
  };

  // Fonction pour ouvrir le modal de mise à jour avec les détails de l'élément à mettre à jour
  const openUpdateModal = (blood) => {
    setUpdateBlood({ id: blood.id, quantity_change: "" });
    setIsUpdateModalOpen(true);
  };

  // Fonction pour mettre à jour la quantité de sang
  const handleUpdateBlood = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      await axios.patch(`http://localhost:8000/hospitals/update_blood_stock/${updateBlood.id}/`, { quantity_change: updateBlood.quantity_change }, config);
      fetchBloodList(); // Actualiser la liste après la mise à jour
      setIsUpdateModalOpen(false); // Fermer le modal de mise à jour
      setUpdateBlood({ id: null, quantity_change: "" });
    } catch (error) {
      console.error("Error updating blood: ", error.message);
    }
  };

  // Fonction pour ouvrir le modal d'historique
  const openHistoryModal = async () => {
    try {
      await fetchBloodHistory(); // Appel de la fonction pour récupérer l'historique des changements
      setIsHistoryModalOpen(true); // Ouvrir le modal d'historique une fois les données récupérées
    } catch (error) {
      console.error("Error fetching blood history: ", error.message);
    }
  };

  // Fonction pour ouvrir le modal de détails
  const openDetailsModal = (detail) => {
    setSelectedDetail(detail);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-md-9">
          <div className="container mt-5">
            <h4 className="text-center mb-4">List of blood type</h4>
            <Button
              className="btn btn-success mb-3"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add new category
            </Button>
            <div className="table-container">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Blood Type</th>
                    <th>Quantity (ml)</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodList.map((blood) => (
                    <tr key={blood.id}>
                      <td>{blood.blood_type}</td>
                      <td>{blood.quantity_ml}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => openUpdateModal(blood)}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-3 d-flex flex-column align-items-start justify-content-center">
          <Button className="btn btn-info mb-3" onClick={openHistoryModal}>
            History
          </Button>
        </div>
      </div>

      {/* Popup pour ajouter une nouvelle catégorie de sang */}
      {isAddModalOpen && (
        <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add new category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="bloodType" className="form-label">
                  Blood Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bloodType"
                  value={newBlood.blood_type}
                  onChange={(e) =>
                    setNewBlood({ ...newBlood, blood_type: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity (ml)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={newBlood.quantity_ml}
                  onChange={(e) =>
                    setNewBlood({ ...newBlood, quantity_ml: e.target.value })
                  }
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleAddBlood}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Popup pour mettre à jour la quantité de sang */}
      {isUpdateModalOpen && (
        <Modal
          show={isUpdateModalOpen}
          onHide={() => setIsUpdateModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Blood quantity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="quantityChange" className="form-label">
                  Change quantity (ml)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantityChange"
                  value={updateBlood.quantity_change}
                  onChange={(e) =>
                    setUpdateBlood({
                      ...updateBlood,
                      quantity_change: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateBlood}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Popup pour afficher l'historique des changements */}
      {isHistoryModalOpen && (
        <Modal
          show={isHistoryModalOpen}
          onHide={() => setIsHistoryModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bloodHistory.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Type de Sang</th>
                    <th>Change Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.blood_type}</td>
                      <td>{entry.change_type}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => openDetailsModal(entry)}
                        >
                          Détails
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Nothig here yet</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsHistoryModalOpen(false)}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Popup pour afficher les détails d'un changement */}
      {isDetailsModalOpen && (
        <Modal
          show={isDetailsModalOpen}
          onHide={() => setIsDetailsModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDetail ? (
              <div>
                <p>
                  <strong>Blood type:</strong> {selectedDetail.blood_type}
                </p>
                <p>
                  <strong>Change type:</strong> {selectedDetail.change_type}
                </p>
                <p>
                  <strong>Quantity changed (ml):</strong>{" "}
                  {selectedDetail.change_quantity}
                </p>
                <p>
                  <strong>New quantity (ml):</strong>{" "}
                  {selectedDetail.new_quantity}
                </p>
                <p>
                  <strong>Date and Time:</strong>{" "}
                  {new Date(selectedDetail.timestamp).toLocaleString()}
                </p>
              </div>
            ) : (
              <p>Nothing changed yet</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ListBloodHistory;
