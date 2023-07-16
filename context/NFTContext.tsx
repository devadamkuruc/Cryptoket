"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constants";
import { INFTContext } from "@/types/NFT";

export const NFTContext = React.createContext<INFTContext>({
  nftCurrency: "ETH",
});

export const NFTProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "ETH";

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
      {children}
    </NFTContext.Provider>
  );
};
