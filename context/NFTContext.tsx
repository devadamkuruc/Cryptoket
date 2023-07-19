"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { MarketAddress, MarketAddressABI } from "./constants";
import {
  IFormInput,
  IFormattedNFT,
  INFTContext,
  INFTMetadata,
  IRawNFT,
} from "@/types/NFT";
import createCtx from "@/utils/createCtx";

export const [useCurrentNFTContext, NFTContextProvider] =
  createCtx<INFTContext>();

const fetchContract = (
  signerOrProvider: ethers.JsonRpcSigner | ethers.JsonRpcProvider
) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

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

  const uploadToIPFS = async (file: File) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

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

  const createNFT = async (
    formInput: IFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = { name, description, image: fileUrl };

    return axios
      .post(url, data, {
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET,
        },
      })
      .then(function (response) {
        const url =
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
        createSale(url, price);
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const price = ethers.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString(),
    });

    await transaction.wait();
  };

  const fetchNFTs = async (): Promise<IFormattedNFT[]> => {
    const provider = new ethers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(
        async ({
          tokenId,
          seller,
          owner,
          price: unformattedPrice,
        }: IRawNFT) => {
          const tokenURI = await contract.tokenURI(tokenId);

          const {
            data: { image, name, description },
          } = await axios.get(tokenURI, {
            headers: {
              Accept: "text/plain",
            },
          });

          const price = ethers.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: Number(tokenId),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  const fetchMyNFTsOrListedNFTs = async (
    type: string
  ): Promise<IFormattedNFT[]> => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();

    const contract = fetchContract(signer);

    const data =
      type === "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs;

    const items = await Promise.all(
      data.map(
        async ({
          tokenId,
          seller,
          owner,
          price: unformattedPrice,
        }: IRawNFT) => {
          const tokenURI = await contract.tokenURI(tokenId);

          const {
            data: { image, name, description },
          } = await axios.get(tokenURI, {
            headers: {
              Accept: "text/plain",
            },
          });

          const price = ethers.formatUnits(
            unformattedPrice.toString(),
            "ether"
          );

          return {
            price,
            tokenId: Number(tokenId),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  return (
    <NFTContextProvider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
      }}
    >
      {children}
    </NFTContextProvider>
  );
};
