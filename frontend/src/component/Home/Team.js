import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Ahassad Nada",
      imgSrc: "img/NADA.png",
      delay: "0.1s",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Bouchouikar Saif",
      imgSrc: "img/SAIF.png",
      delay: "0.3s",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "El Maazouza Randa",
      imgSrc: "img/RANDA .png",
      delay: "0.5s",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Laachir Moussaab",
      imgSrc: "img/Mousaab.png",
      delay: "0.7s",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center mx-auto wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: "500px" }}
        >
          <p className="section-title bg-white text-center txt-primary px-3">
            Our Team
          </p>
          <h1 className="mb-5">Experienced Team Members</h1>
        </div>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div
              className="col wow fadeInUp"
              data-wow-delay={member.delay}
              key={index}
            >
              <div className="team-item rounded p-4">
                <img
                  className="img-fluid rounded mb-4"
                  src={member.imgSrc}
                  alt={member.name}
                />
                <h5>{member.name}</h5>
                <br />

                <div className="d-flex justify-content-center">
                  <a
                    className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                    href={member.social.facebook}
                  >
                    {" "}
                    <img
                      className="img-fluid rounded"
                      src="\img\icons8-twitter-circled-48.png"
                      alt="Banner 1"
                    />
                  </a>
                  <a
                    className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                    href={member.social.twitter}
                  >
                    <img
                      className="img-fluid rounded"
                      src="\img\icons8-instagram-48.png"
                      alt="Banner 1"
                    />
                  </a>
                  <a
                    className="btn btn-square btn-outline-secondary rounded-circle mx-1"
                    href={member.social.instagram}
                  >
                    <img
                      className="img-fluid rounded"
                      src="\img\icons8-facebook-48.png"
                      alt="Banner 1"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
