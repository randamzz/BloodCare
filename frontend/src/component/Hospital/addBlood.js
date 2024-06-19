import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

const AddBlood = ({ show, onHide, fetchBloodList }) => {
  const [newBlood, setNewBlood] = useState({ blood_type: "", quantity_ml: "" });

  const handleAddBlood = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      const user = await axios.get(
        "http://localhost:8000/user/profile/",
        config
      );
      const userId = user.data.id;
      const newBloodWithUserId = { ...newBlood, user_id: userId };
      await axios.post(
        "http://localhost:8000/hospitals/add_blood_stock/",
        newBloodWithUserId,
        config
      );
      fetchBloodList(); // Actualiser la liste après l'ajout
      onHide(); // Fermer le modal d'ajout
    } catch (error) {
      console.error("Error adding blood: ", error.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
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
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBlood}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBlood;
