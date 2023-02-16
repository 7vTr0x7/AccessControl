import React, { useState, useEffect } from "react";

import "./Revoke.css"

const Revoke = ({state,currentAccount}) => {
    const revoke = async (event) => {
        event.preventDefault();
        const { contract } = state;
        const user = document.querySelector("#user").value;
        if (user === currentAccount) {
          const recipient = document.querySelector("#recipient").value;
          const revoke = await contract.revoke_consent(user, recipient);
          await revoke.wait();
          console.log("access revoked");
        } else {
          alert("not owner");
        }
      };
  return (
    <>
    <div className="container-md">
    <h3>RevokeConsent</h3>

    <form onSubmit={revoke}>
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
        REVOKE ACCESS
      </button>
    </form>
  </div>
    </>
  )
}

export default Revoke