import React from "react";

const HomeHeader = ({ toggleModal }) => {
  return (
    <div className="homeContainer__top">
      <div className="homeTopContainerInfo column">
        <h3> Get the best interor design and decor for your home</h3>
        <p>
          "I am a passionate interior designer, crafts captivating spaces with
          meticulous attention to detail and innovative flair, consistently
          exceeding expectations and turning visions into reality.".
        </p>
        <button type="button" onClick={toggleModal}>
          Contact
        </button>
      </div>
      <div className="homeContainer__footer row">
        <div>
          <h4>Years of exprience</h4>
          <h5>10</h5>
        </div>
        <div>
          <h4>Complete Product</h4>
          <h5>1300</h5>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
