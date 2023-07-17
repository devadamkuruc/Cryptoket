"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { Button } from "@/components";
import { useCurrentNFTContext } from "@/context/NFTContext";

interface Props {
  setActive: (item: string) => void;
  router: AppRouterInstance;
}

const ButtonGroup = ({ setActive, router }: Props) => {
  const { connectWallet, currentAccount } = useCurrentNFTContext();

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive("");
        router.push("/create-nft");
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

export default ButtonGroup;
