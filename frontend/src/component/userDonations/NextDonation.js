import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import "../../Styles/counter.css";
import AddDonation from "./AddDonation";

const NextDonation = ({ lastDonationDate }) => {

//ouverture et fermeture modl add
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);

  const handleModalOpen = () => {
    setShowAddDonationModal(true);
  };

  const handleModalClose = () => {
    setShowAddDonationModal(false);
  };

    const openAddDonationtModal = () => {
      console.log("you are in  add!");
      handleModalOpen();
    };

  // Function  add 3 months to the last donation date
  const addMonthsToDate = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 3);
    return newDate;
  };

  const nextDonationDate = lastDonationDate
    ? addMonthsToDate(lastDonationDate)
    : null;
  const currentDate = new Date();
  const difference = nextDonationDate ? nextDonationDate - currentDate : 0;
  const [youCanDonate, setYouCanDonate] = useState(false);

  useEffect(() => {
    if (!lastDonationDate || difference <= 0) {
      setYouCanDonate(true);
    } else {
      setYouCanDonate(false);
    }
  }, [lastDonationDate, difference]);

  const countdown = (
    <Countdown
      date={nextDonationDate}
      renderer={({ days, hours, minutes, seconds }) => {
        return (
          <div className="col-xl-10" style={{ marginLeft: "69px" }}>
            <h1 className="mb-4" style={{ color: "black" }}>
              <br />
              <br />
              <br />
              You are unable to donate <br />{" "}
              <span>Next opportunity after </span>{" "}
            </h1>
            <div id="timer" className="d-flex mb-3">
              <div className="time" id="days" style={{ color: "#bc4d60" }}>
                {days}
                <span style={{ color: "#bc4d60" }}>Days</span>
              </div>
              <div
                className="time pl-4"
                id="hours"
                style={{ color: "#bc4d60" }}
              >
                {hours}
                <span style={{ color: "#bc4d60" }}>Hours</span>
              </div>
              <div
                className="time pl-4"
                id="minutes"
                style={{ color: "#bc4d60" }}
              >
                {minutes}
                <span style={{ color: "#bc4d60" }}>Minutes</span>
              </div>
              <div
                className="time pl-4"
                id="seconds"
                style={{ color: "#bc4d60" }}
              >
                {seconds}
                <span style={{ color: "#bc4d60" }}>Seconds</span>
              </div>
            </div>
          </div>
        );
      }}
    />
  );

  return (
    <div
      className="row no-gutters slider-text js-fullheight align-items-center justify-content-start"
      data-scrollax-parent="true"
    >
      {youCanDonate ? (
        <div className="col-xl-10" style={{ marginLeft: "69px" }}>
          <h1 className="mb-4" style={{ color: "black" }}>
            <br />
            <br />
            <br />
            You are able to donate <br /> <span>Donate Now</span>{" "}
          </h1>
          <button
            className="btn btn-danger rounded-5 btn-lg"
            style={{ marginLeft: "39px" }}
            onClick={openAddDonationtModal}
          >
            Add your last donation
          </button>
          {showAddDonationModal && (
            <div>
              <AddDonation show={handleModalOpen} onHide={handleModalClose} />{" "}
            </div>
          )}
        </div>
      ) : (
        <div>{countdown}</div>
      )}
    </div>
  );
};

export default NextDonation;
