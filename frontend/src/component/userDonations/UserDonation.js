import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import NextDonation from "./NextDonation";
import DonationList from "./DonationList";
import Section2 from "./section2";
import "../../Styles/counter.css";

const UserDonation = () => {
  const [donations, setDonations] = useState([]);
  const [lastDonationDate, setLastDonationDate] = useState(null);
  const [showDonationListModal, setShowDonationListModal] = useState(false);
  const [isCitizen, setIsCitizen] = useState(true);

  const handleModalOpen = () => {
    setShowDonationListModal(true);
  };

  const handleModalClose = () => {
    setShowDonationListModal(false);
  };

  const fetchDonations = async () => {
    try {
      const accessToken = Cookies.get("access_token");

      const response = await axios.get(
        "http://localhost:8000/citizen/userdonations/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        const sortedDonations = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setDonations(sortedDonations);
        setLastDonationDate(sortedDonations[0].date);
      } else {
        console.error(
          "Response data is either not an array or empty:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    const userType = Cookies.get("user_type");

    if (userType !== "citizen") {
      setIsCitizen(false);
    } else {
      fetchDonations();
    }
  }, []);

  const openDonationListModal = () => {
    handleModalOpen();
  };

  if (!isCitizen) {
    return <Navigate to="/error" />;  }

  return (
    <div>
      <div className="hero-wrap">
        <div className="container1">
          <div className="timer1">
            <NextDonation lastDonationDate={lastDonationDate} />
            <br />
            <button
              className="btn  rounded-5 btn-lg"
              style={{
                marginLeft: "100px",
                backgroundColor: "#cc466a",
                height: "50px",
                width: "300px",
              }}
              onClick={openDonationListModal}
            >
              Get list of your donation
            </button>
            {showDonationListModal && (
              <div>
                <DonationList
                  donations={donations}
                  show={handleModalOpen}
                  onHide={handleModalClose}
                />
              </div>
            )}
          </div>

          <div className="section2">
            <br /> <br /> <br />
            <Section2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDonation;
