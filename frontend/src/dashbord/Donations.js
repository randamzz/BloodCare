import React from "react";

const Donations = () => {
  return (
    
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card overflow-hidden">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-9 fw-semibold">
                        DDS.03 Donations
                      </h5>
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h4 className="fw-semibold mb-3">+ 358</h4>
                          <div className="d-flex align-items-center mb-3">
                            <span
                              className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center"
                            >
                              <i className="ti ti-arrow-up-left text-success"></i>
                            </span>
                            <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                            <p className="fs-3 mb-0">last year</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="me-4">
                              <span
                                className="round-8 bg-primary rounded-circle me-2 d-inline-block"
                              ></span>
                              <span className="fs-2">2024</span>
                            </div>
                            <div>
                              <span
                                className="round-8 bg-light-primary rounded-circle me-2 d-inline-block"
                              ></span>
                              <span className="fs-2">2023</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-center">
                            <div id="breakup"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row alig n-items-start">
                        <div className="col-8">
                          <h5 className="card-title mb-9 fw-semibold">
                            DDS.01 Donations
                          </h5>
                          <h4 className="fw-semibold mb-3">-220</h4>
                          <div className="d-flex align-items-center pb-1">
                            <span
                              className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center"
                            >
                              <i className="ti ti-arrow-down-right text-danger"></i>
                            </span>
                            <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                            <p className="fs-3 mb-0">last year</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default Donations;
