import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

const UpdateBlood = ({ show, onHide, fetchBloodList, id, quantity_before }) => {
  const [updateBlood, setUpdateBlood] = useState({
    id: id,
    quantity_change: "", // Laissez la valeur initiale vide pour permettre à l'utilisateur de saisir la quantité à changer
  });

  const handleUpdateBlood = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      await axios.patch(
        `http://localhost:8000/hospitals/update_blood_stock/${updateBlood.id}/`,
        { quantity_change: updateBlood.quantity_change },
        config
      );
      fetchBloodList();
      onHide();
      setUpdateBlood({ id: null, quantity_change: "" }); // Réinitialise l'état après la mise à jour
    } catch (error) {
      console.error("Error updating blood: ", error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Blood quantity (Add/Increase) </Modal.Title>
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
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateBlood}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateBlood;
