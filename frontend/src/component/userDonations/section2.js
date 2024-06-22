import React from "react";
import "../../Styles/animate.css"; 

const Section2 = () => {
  const products = [
    {
      id: 4,
      imgSrc: "/img/dds.png",
      name: "What is the interval between donations?",
      reponse1: "3 Months",
      reponse2: "Please respect this duration",
      reponse3: "For more info, ask Zoubida",
    },
    {
      id: 3,
      imgSrc: "/img/bloodtype.png",
      name: "What is the most needed blood type?",
      reponse1: "O +",
      reponse2: "O -",
      reponse3: "A +",
    },
    {
      id: 2,
      imgSrc: "/img/donate.png",
      name: "Where to donate?",
      reponse1: "Blood transfusion center",
      reponse2: "Check our events",
      reponse3: "For more info, ask Zoubida",
    },

    {
      id: 1,
      imgSrc: "/img/donor.png",
      name: "Who can donate?",
      reponse1: "Anyone healthy.",
      reponse2: "Aged 18-65.",
      reponse3: "Weighs over 50kg.",
    },
  ];

  return (
    <section className="product_section ">
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-sm-6 col-md-6 col-lg-6">
              <div className="box">
                <div className="option_container">
                  <div className="options">
                    <a href="/" className="option1">
                      {product.reponse1} 
                    </a>
                    <a href="/" className="option2">
                      {product.reponse2}
                    </a>
                    <a href="/" className="option3">
                      {product.reponse3}
                    </a>
                  </div>
                </div>
                <div className="img-box">
                  <img src={product.imgSrc} alt={product.name} />
                </div>
                <div className="detail-box">
                  <h5>{product.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;
