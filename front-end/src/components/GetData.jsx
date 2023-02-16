import React, { useState } from "react";

import "./GetData.css";

const GetData = ({ state }) => {
  const [userData, setuserData] = useState("");

  const getData = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const user = document.querySelector("#user").value;
    const recipient = document.querySelector("#recipient").value;
    const data = await contract.getData(user, recipient);
 
    console.log(data);
    setuserData(data);
  };

  return (
    <>
      <div className="container-md">
        <h3>GetData</h3>

        <form onSubmit={getData}>
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
            Get Data
          </button>

          <span>{`${userData}`}</span>
        </form>
      </div>
    </>
  );
};

export default GetData;
