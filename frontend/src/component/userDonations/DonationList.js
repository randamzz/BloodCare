import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const DonateNow = () => (
  <div className="col-lg-12 mb-3 d-flex align-items-center justify-content-center">
    <div className="w-100 d-flex flex-column text-center">
      <h5 className="border-bottom pb-2">
        <span>
          You have never donated{" "}
          <span role="img" aria-label="sad">
            😔
          </span>
        </span>
      </h5>
      <p className="fst-italic mb-0">
        Donate now by checking{" "}
        <Link to="/events" style={{ color: "#7cc9d5" }}>
          our events
        </Link>{" "}
        and save lives!
      </p>
      <center>
        <img
          className="img-fluid rounded"
          src="/img/savelife.png"
          alt=""
          style={{ maxWidth: "200px", marginTop: "10px" }}
        />
      </center>
    </div>
  </div>
);


const ShowDonations = ({ donations }) => (
  <div className="row overflow-auto" style={{ maxHeight: "250px" }}>
    {donations.map((donation, index) => (
      <div key={index} className="col-lg-12 mb-3">
        <div className="d-flex align-items-center">
          <img
            className="flex-shrink-0 img-fluid rounded"
            src="/img/a+.png"
            alt=""
            style={{ width: "80px" }}
          />
          <div className="w-100 d-flex flex-column text-start ps-4">
            <h5 className="d-flex justify-content-between border-bottom pb-2">
              <span>{donation.location}</span>
              <span className="text-danger">{donation.volume} ml</span>
            </h5>
            <small className="fst-italic">{donation.date}</small>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const DonationList = ({ donations, show, onHide }) => {
  console.log("you are in donation list ");
  console.log(donations);

  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="modal-center">
      <Modal.Body>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="mb-5">Your Donations</h1>
              <hr />
            </div>
            <div >
              {donations.length === 0 ? (
                <DonateNow />
              ) : (
                <ShowDonations donations={donations} />
              )}
            </div>
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

export default DonationList;
