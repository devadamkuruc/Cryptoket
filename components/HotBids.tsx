"use client";

import { useEffect, useState } from "react";

import { Loader, NFTCard, SearchBar } from "@/components";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { ActiveSelectOption, IFormattedNFT } from "@/types/NFT";
import { sortMethods } from "@/utils";

const HotBids = () => {
  const { fetchNFTs } = useCurrentNFTContext();
  const [nfts, setNfts] = useState<IFormattedNFT[]>([]);
  const [nftsCopy, setNftsCopy] = useState<IFormattedNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] =
    useState<ActiveSelectOption>("Recently added");

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

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

  return (
    <section className="mt-10">
      <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
          Top NFTs
        </h1>

        <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
          <SearchBar
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
            handleSearch={onHandleSearch}
            clearSearch={onClearSearch}
          />
        </div>
      </div>

      {isLoading && <Loader />}
      <div className="mt-3 w-full grid minmd:grid-cols-5 grid-cols-4 md:grid-cols-3 mdsm:grid-cols-2 xs:grid-cols-1 gap-8 sm:gap-4">
        {nfts.sort(sortMethods[activeSelect].method).map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </section>
  );
};

export default HotBids;
