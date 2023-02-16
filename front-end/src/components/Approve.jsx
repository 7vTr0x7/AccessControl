import React, { useState, useEffect } from "react";

import "./Approve.css";

const Approve = ({ state, currentAccount }) => {
  let message;

  const limit = 100;
  const [charCount, setcharCount] = useState(0);
  const [isLimit, setisLimit] = useState(false);

  function onTextChange(e) {
    const count = e.target.value.length;
    setcharCount(count);
  }

  useEffect(() => {
    setisLimit(charCount > limit);
  }, [charCount]);

  const giveAccess = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const user = document.querySelector("#user").value;

    if (user === currentAccount) {
      message = document.querySelector("#message").value;

      const recipient = document.querySelector("#recipient").value;
      console.log(user, message, recipient);
      const approve = await contract.give_consent(user, recipient, message);
      await approve.wait();
      console.log("approve is done");

      

    } else {
      alert("not owner");
    }
  };

  return (
    <>
      <div className="container-md">
        <h3>GiveConsent</h3>
        <form onSubmit={giveAccess}>
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
          <div className="mb-3">
            <label className="form-label">Message : </label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
              onChange={onTextChange}
            />
            <span className={`${isLimit && "text-red-900"}`}>
              {limit - charCount}
              /100
            </span>
          </div>
          <button
            type="submit"
            className="btn"
            disabled={!state.contract || isLimit}
          >
            GIVE ACCESS
          </button>
        </form>
      </div>
    </>
  );
};

export default Approve;
