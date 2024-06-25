import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import AddBlood from "./addBlood";
import UpdateBlood from "./updateBlood";
import { Navigate } from "react-router-dom";

const BloodList = () => {
  const [bloodList, setBloodList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bloodToUpdate, setBloodToUpdate] = useState({
    id: null,
    quantity_before: "",
  });
  const [isHospital, setisHospital] = useState(true);

  const fetchBloodList = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const response = await axios.get(
        "http://localhost:8000/hospitals/list_blood_stock/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setBloodList(response.data);
    } catch (error) {
      console.error("Error fetching blood list: ", error.message);
    }
  };

  useEffect(() => {
    fetchBloodList();
  }, []);

  const handleUpdateModalOpen = (blood) => {
    setShowUpdateModal(true);
    setBloodToUpdate({ id: blood.id, quantity_before: blood.quantity_ml });
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setBloodToUpdate({ id: null, quantity_before: "" });
  };
  useEffect(() => {
    const userType = Cookies.get("user_type");

    if (userType !== "hospital") {
      setisHospital(false);
    } else {
      fetchBloodList();
    }
  }, []);
  if (!isHospital) {
    return <Navigate to="/error" />;
  }
  return (
    <div className="container-fluid">
      <div className="table-responsive mt-3">
        {showAddModal && (
          <AddBlood
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            fetchBloodList={fetchBloodList}
          />
        )}
        {showUpdateModal && (
          <UpdateBlood
            show={showUpdateModal}
            onHide={handleUpdateModalClose}
            fetchBloodList={fetchBloodList}
            id={bloodToUpdate.id}
            quantity_before={bloodToUpdate.quantity_before}
          />
        )}
        <table className="table-custom align-items-center mb-0">
          <thead>
            <tr>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Blood Type
              </th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Total Quantity (ml)
              </th>
              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            {bloodList.map((blood) => (
              <tr key={blood.blood_type}>
                <td>
                  <div className="d-flex px-2 py-1">
                    <div className="d-flex flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">{blood.blood_type}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    {blood.quantity_ml}
                  </p>
                </td>
                <td className="align-middle text-center text-sm">
                  <button
                  className="btn rounded-5"
                    onClick={() => handleUpdateModalOpen(blood)}
                    style={{ backgroundColor: "#54a9b9", color: "white" }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div style={{ textAlign: "right", marginRight: "7%" }}>
        {/* <button
          className="btn rounded-5 btn-lg"
          style={{ backgroundColor: "#cc466a", float: "right" }}
          onClick={() => setShowAddModal(true)}
        >
          +
        </button> */}
      </div>

      {/* <div className="row align-items-center">
        <div className="col-md-9">
          <div className="container mt-5">
            <h4 className="text-center mb-4">List of blood types</h4>
            <br />
            <button
              className="btn  rounded-5 btn-lg"
              style={{ marginLeft: "100px", backgroundColor: "#cc466a" }}
              onClick={() => setShowAddModal(true)}
            >
              Add
            </button>
            {showAddModal && (
              <AddBlood
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                fetchBloodList={fetchBloodList}
              />
            )}
            {showUpdateModal && (
              <UpdateBlood
                show={showUpdateModal}
                onHide={handleUpdateModalClose}
                fetchBloodList={fetchBloodList}
                id={bloodToUpdate.id}
                quantity_before={bloodToUpdate.quantity_before}
              />
            )}
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
                        <Button onClick={() => handleUpdateModalOpen(blood)}>
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
      </div> */}
    </div>
  );
};

export default BloodList;
