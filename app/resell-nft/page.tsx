"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { useCurrentNFTContext } from "@/context/NFTContext";
import { Loader, Button, Input } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchParams {
  tokenId: string;
  tokenURI: string;
}

interface Props {
  searchParams: SearchParams;
}

const ResellNFT = ({ searchParams: { tokenId, tokenURI } }: Props) => {
  const { createSale } = useCurrentNFTContext();
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
    setIsLoading(false);
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  const resell = async () => {
    await createSale(tokenURI, price, true, tokenId);

    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex flex-start min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Resell NFT
        </h1>

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image ? (
          <Image
            src={image}
            className="rounded mt-4"
            width={350}
            height={350}
            alt="nft"
          />
        ) : (
          ""
        )}

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
