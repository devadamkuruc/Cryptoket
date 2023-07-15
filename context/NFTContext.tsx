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
  const nftCurrency = "ETH";

  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  );
};
