import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";

const AddDonation = ({ show, onHide }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    location: "",
    blood_type: "",
    volume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.date ||
      !formData.location ||
      !formData.blood_type ||
      !formData.volume
    ) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }
    try {
      const accessToken = Cookies.get("access_token");

      const response = await axios.post(
        "http://localhost:8000/citizen/newuserdonations/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("New donation created:", response.data);
      setFormData({
        date: "",
        location: "",
        blood_type: "",
        volume: "",
      });
      setSuccessMessage("Donation aded successfully! Cheek you list now ");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Error creating donation:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const currentDate = new Date().toISOString().split("T")[0]; //pour cacher les dates de futures dans date

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="modal-center">
      <Modal.Body>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="mb-5">Add Your Last Donation</h1>
              <hr />
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="row overflow-auto"
              style={{ maxHeight: "250px" }}
            >
              <div className="col-md-12 mb-3 rounded-5">
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  placeholder="When did you donate ?"
                  value={formData.date}
                  onChange={handleChange}
                  min="1900-01-01"
                  max={currentDate}
                  required
                />
              </div>

              <div className="col-md-12 mb-3 rounded-5">
                <input
                  className="form-control"
                  type="text"
                  name="location"
                  placeholder="Where did you donate ?"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 mb-3 rounded-5">
                <select
                  className="form-select"
                  name="blood_type"
                  value={formData.blood_type}
                  placeholder=" Select your type of blood"
                  onChange={handleChange}
                  required
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="col-md-12 mb-3 rounded-5">
                <input
                  className="form-control"
                  type="number"
                  name="volume"
                  placeholder={`Volume donated (ml)`}
                  value={formData.volume}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-secondary rounded-5 ">
                Add
              </button>
            </form>
            <div className="text-end">
              <hr />
              <button className="btn btn-secondary rounded-5" onClick={onHide}>
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddDonation;
