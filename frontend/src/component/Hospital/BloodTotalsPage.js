import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/style.css";
import { Navigate } from "react-router-dom";

const BloodTotalsPage = () => {
  const [bloodTotals, setBloodTotals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [isHospital, setisHospital] = useState(true);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const fetchBloodTotals = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      const response = await axios.get(
        "http://localhost:8000/hospitals/blood_totals/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const fetchedTotals = response.data;

      const updatedTotals = bloodTypes.map((type) => {
        const found = fetchedTotals.find((item) => item.blood_type === type);
        return found ? found : { blood_type: type, total_quantity_ml: 0 };
      });

      setBloodTotals(updatedTotals);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blood totals: ", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodTotals();
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);

  const totalBloodQuantity = bloodTotals.reduce(
    (acc, current) => acc + current.total_quantity_ml,
    0
  );

  const getStatus = (quantity) => {
    if (quantity > 4000) {
      return { text: "high", color: "bg-gradient-success" };
    } else if (quantity >= 1000) {
      return { text: "medium", color: "bg-gradient-info" };
    } else if (quantity >= 500) {
      return { text: "low", color: "bg-gradient-warning" };
    } else {
      return { text: "very low", color: "bg-gradient-danger" };
    }
  };

  const getProgressBarClass = (status) => {
    switch (status) {
      case "very low":
        return "bg-gradient-danger";
      case "low":
        return "bg-gradient-warning";
      case "medium":
        return "bg-gradient-info";
      case "high":
        return "bg-gradient-success";
      default:
        return "bg-gradient-primary";
    }
  };

  const buttonStyle = {
    borderRadius: "5px",
    marginRight: "5px",
    fontSize: "0.9rem",
  };

  const progressBarContainerStyle = {
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    backgroundColor: "#f8f9fa",
  };

  const progressBarStyle = {
    height: "20px",
  };
  useEffect(() => {
    const userType = Cookies.get("user_type");

    if (userType !== "hospital") {
      setisHospital(false);
    } else {
      fetchBloodTotals();
    }
  }, []);
  if (!isHospital) {
    return <Navigate to="/error" />;
  }
  return (
    <div
      className="container-fluid mt-9"
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/img/bgstock.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-white mb-1">.</h3>
        </div>
        <div className="col-md-12 mb-4">
          <h2 className="text-center text-white">Voici Info:</h2>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card tale-bg">
            <div className="card-people mt-auto">
              <img src="/img/BG1.png" alt="people" />
              <div className="weather-info">
                <div className="d-flex">
                  <div>
                    <h2 className="mb-0 font-weight-normal">
                      <i className="icon-sun mr-2"></i>23<sup>C</sup>
                    </h2>
                  </div>
                  <div className="ml-2">
                    <h4 className="location font-weight-normal">Maroc</h4>
                    <h6 className="location font-weight-normal">Tanger</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin transparent">
          <div className="row">
            <div className="col-md-12">
              <center>
                <h3 className=" txtd text-BLACK mb-0 text-right">
                  <img className="img" src="/img/DATE.png" alt="" />
                  Date: {currentDate}
                </h3>
              </center>
            </div>
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card  card-tale">
                <div className="card-body">
                  <p className="mb-4 text-white">Today’s donations</p>
                  <p className="fs-30 mb-3 text-white">34</p>
                  <p>10.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4 stretch-card transparent">
              <div className="card card-dark-blue">
                <div className="card-body">
                  <p className="mb-4 text-white">Total Alert</p>
                  <p className="fs-30 mb-3 text-white">61344</p>
                  <p>22.00% (30 days)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
              <div className="card card-light-blue">
                <div className="card-body">
                  <p className="mb-4 text-white">Number of donors</p>
                  <p className="fs-30 mb-3 text-white">34040</p>
                  <p>2.00% (30 days)</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 stretch-card transparent">
              <div className="card card-light-danger">
                <div className="card-body">
                  <p className="mb-4 text-white">Number of Clients</p>
                  <p className="fs-30 mb-3 text-white">47033</p>
                  <p>0.22% (30 days)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="row">
            <div className="col-md-6 mt-4">
              <div className="card card-rounded">
                <div className="card-body">
                  <div className="d-sm-flex justify-content-between align-items-start">
                    <div>
                      <h2 className="card-title card-title-dash">
                        Blood Stock Overview
                      </h2>
                      <p className="card-subtitle card-subtitle-dash">
                        Overview of blood stock levels
                      </p>
                    </div>
                  </div>
                  <div className="table-responsive mt-3">
                    <table className="table-custom align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Blood Type
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Total Quantity (ml)
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bloodTotals.map((total) => (
                          <tr key={total.blood_type}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {total.blood_type}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {total.total_quantity_ml}
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span
                                className={`badge badge-sm ${
                                  getStatus(total.total_quantity_ml).color
                                }`}
                              >
                                {getStatus(total.total_quantity_ml).text}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-4">
              <div className="card card-rounded">
                <div className="card-body">
                  <h2 className="card-title card-title-dash">Progress Bars</h2>
                  <p className="card-subtitle card-subtitle-dash">
                    Overview of blood stock percentages
                  </p>
                  <div className="mt-3" style={progressBarContainerStyle}>
                    {bloodTotals.map((total) => (
                      <div className="mb-3" key={total.blood_type}>
                        <label className="text-black">{total.blood_type}</label>
                        <div className="progress" style={progressBarStyle}>
                          <div
                            className={`progress-bar ${getProgressBarClass(
                              getStatus(total.total_quantity_ml).text
                            )} progress-bar-animated progress-bar-striped`}
                            role="progressbar"
                            style={{
                              width: `${(
                                (total.total_quantity_ml / totalBloodQuantity) *
                                100
                              ).toFixed(2)}%`,
                            }}
                            aria-valuenow={(
                              (total.total_quantity_ml / totalBloodQuantity) *
                              100
                            ).toFixed(2)}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <span>
                              {(
                                (total.total_quantity_ml / totalBloodQuantity) *
                                100
                              ).toFixed(2)}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BloodTotalsPage;
