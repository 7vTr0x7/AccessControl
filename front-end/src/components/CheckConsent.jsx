import React, { useState } from "react";

import "./CheckConsent.css"

const CheckConsent = ({ state }) => {
  const [checkAccess, setCheckAccess] = useState(false);

  const check = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const user = document.querySelector("#user").value;
    const recipient = document.querySelector("#recipient").value;
    const access = await contract.check_consent(user, recipient);
    console.log(access);
    setCheckAccess(access);
  };

  return (
    <>
      <div className="container-md">
        <h3>CheckConsent</h3>

        <form onSubmit={check}>
          <div className="mb-3">
            <label className="form-label">USER : </label>
            <input
              type="text"
              className="form-control"
              id="user"
              placeholder="user"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">RECIPIENT : </label>
            <input
              type="text"
              className="form-control"
              id="recipient"
              placeholder="RECIPIENT"
            />
          </div>

          <button type="submit" className="btn">
            CHECK ACCESS
          </button>
          <span className="consent">{`${checkAccess}`}</span>
        </form>
      </div>
    </>
  );
};

export default CheckConsent;
