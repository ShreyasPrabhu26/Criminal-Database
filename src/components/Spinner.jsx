import React from "react";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner-border text-primary mt-5 spinner" role="status">
        <span className="visually-hidden">Loading...</span>
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
