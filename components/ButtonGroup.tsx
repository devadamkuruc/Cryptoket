import { Button } from "@/components";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

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
