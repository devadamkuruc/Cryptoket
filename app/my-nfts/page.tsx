"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useCurrentNFTContext } from "@/context/NFTContext";
import { Loader, NFTCard, Banner, SearchBar } from "@/components";
import { ActiveSelectOption, IFormattedNFT } from "@/types/NFT";
import { images } from "@/assets";
import { shortenAddress } from "@/utils/shortenAddress";

interface SortingMethod {
  (a: IFormattedNFT, b: IFormattedNFT): number;
}

const MyNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useCurrentNFTContext();
  const [nfts, setNfts] = useState<IFormattedNFT[]>([]);
  const [nftsCopy, setNftsCopy] = useState<IFormattedNFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSelect, setActiveSelect] =
    useState<ActiveSelectOption>("Recently added");

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
      setNfts(items);
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  const sortMethods: Record<string, { method: SortingMethod }> = {
    "Price(low to high)": {
      method: (a, b) => parseFloat(a.price) - parseFloat(b.price),
    },
    "Price(high to low)": {
      method: (a, b) => parseFloat(b.price) - parseFloat(a.price),
    },
    "Recently added": {
      method: (a, b) => b.tokenId - a.tokenId,
    },
  };

  const onHandleSearch = (value: string) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length) {
      setNfts(filteredNfts);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-start min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              src={images.creator3}
              className="rounded-full object-cover"
              alt="profile"
            />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>

      {!isLoading && !nfts.length && !nftsCopy.length ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col ">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 w-full grid minmd:grid-cols-5 grid-cols-4 md:grid-cols-3 mdsm:grid-cols-2 xs:grid-cols-1 gap-8 sm:gap-4">
            {nfts.sort(sortMethods[activeSelect].method).map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
