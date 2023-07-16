"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constants";
import { INFTContext } from "@/types/NFT";

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

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

  console.log(process.env.NEXT_PUBLIC_PINATA_API_KEY);

  const uploadToIPFS = async (file: File) => {
    let data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
      name: "NFT",
      keyvalues: {
        exampleKey: "exampleValue",
      },
    });
    data.append("pinataMetadata", metadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    data.append("pinataOptions", pinataOptions);

    return axios
      .post(url, data, {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
        },
      })
      .then(function (response) {
        console.log("Image uploaded", response.data.IpfsHash);
        return {
          success: true,
          message:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
