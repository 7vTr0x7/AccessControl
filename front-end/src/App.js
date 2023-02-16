import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { Revoke, Approve, CheckConsent, GetData } from "./components/index";
import accessABI from "./utils/Access.json";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [currentAccount, setCurrentAccount] = useState("");
  const [account, setAccount] = useState("None");
  const [signerAccount, setSignerAccount] = useState("None");

  const connectWallet = async () => {
    const contractAddress = "0x0d9E11B907fb2f3e36e95722e19E7100b1aB26A1";
    const contractABI = accessABI.abi;
    try {
      const { ethereum } = window;

      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setCurrentAccount(account[0]);

        ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setAccount(account);
        setState({ provider, signer, contract });

        const signerAddr = await signer.getAddress();

        setSignerAccount(signerAddr);
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      {currentAccount === "" ? (
        <button className="connect" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div style={{ height: "200%" }}>
          <p
            className="text-muted lead "
            style={{ marginTop: "10px", marginLeft: "5px" }}
          >
            <small className="acc">Connected Account : {account}</small>
          </p>
          <div className="container">
            <Approve state={state} currentAccount={currentAccount} signerAccount = {signerAccount}/>
            <CheckConsent state={state} />
            <Revoke state={state} currentAccount={currentAccount} />
            <GetData state={state} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
