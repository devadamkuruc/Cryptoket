import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { Button } from "@/components";

interface Props {
  setActive: (item: string) => void;
  router: AppRouterInstance;
}

const ButtonGroup = ({ setActive, router }: Props) => {
  const hasConnected = true;

  return hasConnected ? (
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
      handleClick={() => {}}
    />
  );
};

export default ButtonGroup;
