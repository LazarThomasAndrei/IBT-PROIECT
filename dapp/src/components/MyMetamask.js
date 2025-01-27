import React, { useState, useEffect } from "react";
import IBT from "../IBT.json";

const IBT_ABI = IBT.abi;
const ethers = require("ethers");
const MyMetamask = ({ setWalletInfo }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [ibtBalance, setIbtBalance] = useState(""); 
  const contractAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; 

  const fetchAccounts = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const fetchedAccounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log("Available Accounts:", fetchedAccounts);

        setAccounts(fetchedAccounts);
        if (fetchedAccounts.length > 0) {
          connectAccount(fetchedAccounts[0]);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        alert("Failed to fetch accounts. Please try again.");
      }
    } else {
      alert("MetaMask is not installed! Please install it to use this feature.");
    }
  };

  const connectAccount = async (account) => {
    try {
      setSelectedAccount(account);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.formatEther(balance);
      const ibtBalance = await fetchIBTBalance(provider, account);

      setWalletInfo({
        address: account,
        balance: `${formattedBalance} ETH`,
        ibtBalance: `${ibtBalance} IBT`,
      });

      setBalance(`${formattedBalance} ETH`);
      setIbtBalance(`${ibtBalance} IBT`);
      console.log("Connected Account:", account);
      console.log("Account Balance:", formattedBalance, "ETH");
      console.log("IBT Token Balance:", ibtBalance, "IBT");
    } catch (error) {
      console.error("Error connecting to account:", error);
      setWalletInfo({
        address: "Connection failed",
        balance: "0.00 ETH",
        ibtBalance: "0.00 IBT",
      });
      setSelectedAccount("Connection failed");
      setBalance("0.00 ETH");
      setIbtBalance("0.00 IBT");
    }
  };

  const fetchIBTBalance = async (provider, account) => {
    try {
      const contract = new ethers.Contract(contractAddress, IBT_ABI, provider);
      const balance = await contract.balanceOf(account);
      return ethers.formatUnits(balance, 18);
    } catch (error) {
      console.error("Error fetching IBT balance:", error);
      return "0.00";
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (newAccounts) => {
        console.log("Accounts Changed:", newAccounts);
        setAccounts(newAccounts);
        if (newAccounts.length > 0) {
          connectAccount(newAccounts[0]);
        } else {
          setSelectedAccount("");
          setBalance("0.00 ETH");
          setIbtBalance("0.00 IBT");
        }
      });
    }
  }, []);

  return (
    <div>
      <div className="button-container">
        {accounts.length === 0 ? (
          <button className="btn" onClick={fetchAccounts}>
            Connect MetaMask
          </button>
        ) : (
          <div>
            <label htmlFor="account-select">Select Account: </label>
            <select
              id="account-select"
              value={selectedAccount}
              onChange={(e) => connectAccount(e.target.value)}
            >
              {accounts.map((account, index) => (
                <option key={index} value={account}>
                  {account}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {selectedAccount && (
        <div>
          <h4>Current account</h4>
          <p>Address: {selectedAccount}</p>
          <p>ETH Balance: {balance}</p>
          <p>IBT Balance: {ibtBalance}</p>
        </div>
      )}
    </div>
  );
};

export default MyMetamask;
