import React from "react";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner-border text-primary mt-5 spinner" role="status">
        <div className="visually-hidden loadingSppiner"><h1>Loading...</h1></div>
      </div>
      <div id="loader">
        <div id="spinner-back">
        </div>
        <div id="spinner">
        </div>
      </div>
    </div>
  );
};

export default Spinner;
