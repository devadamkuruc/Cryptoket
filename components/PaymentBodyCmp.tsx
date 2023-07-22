import { IFormattedNFT } from "@/types/NFT";
import { shortenAddress } from "@/utils/shortenAddress";
import Image from "next/image";
import React from "react";

interface Props {
  nft: IFormattedNFT;
  nftCurrency: string;
}

const PaymentBodyCmp = ({ nft, nftCurrency }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flexBetween">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
          Item
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
          Subtotal
        </p>
      </div>

      <div className="flexBetweenStart my-5">
        <div className="flex-1 flexStartCenter">
          <div className="relative w-28 h-28">
            <Image src={nft.image} alt="nft" fill className="object-cover" />
          </div>
          <div className="flexCenterStart flex-col ml-5">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
              {shortenAddress(nft.seller)}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
              {nft.name}
            </p>
          </div>
        </div>

        <div className="">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.price}
            <span className="font-normal ml-1">{nftCurrency}</span>
          </p>
        </div>
      </div>

      <div className="flexBetween mt-10">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
          Total
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          {nft.price}
          <span className="font-normal ml-1">{nftCurrency}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentBodyCmp;
