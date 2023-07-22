"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";

import { CreatorCard } from "@/components";
import { makeId } from "@/utils/makeId";
import { images } from "../assets";
import { ITopCreator, getTopCreators } from "@/utils/getTopCreators";
import { useCurrentNFTContext } from "@/context/NFTContext";
import { IFormattedNFT } from "@/types/NFT";
import { shortenAddress } from "@/utils/shortenAddress";

const BestCreators = () => {
  const { fetchNFTs } = useCurrentNFTContext();
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const [nfts, setNfts] = useState<IFormattedNFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useTheme();
  const parentRef: RefObject<HTMLDivElement> = useRef(null);
  const scrollRef: RefObject<HTMLDivElement> = useRef(null);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 222 : 222;

    if (direction === "left" && current) {
      current.scrollLeft -= scrollAmount;
    } else if (direction === "right" && current) {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current && parent && current.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);

    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
      setIsLoading(false);
    });
  }, []);

  const topCreators: ITopCreator[] = getTopCreators(nfts);

  return (
    <section>
      <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
        Best Creators
      </h1>
      <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
        <div
          className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
          ref={scrollRef}
        >
          {topCreators.map((creator, i) => (
            <CreatorCard
              key={creator.seller}
              rank={i + 1}
              creatorImage={images[`creator${i + 1}`]}
              creatorName={shortenAddress(creator.seller)}
              creatorEths={creator.sum}
            />
          ))}

          {!hideButtons ? (
            <>
              <div
                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                onClick={() => handleScroll("left")}
              >
                <Image
                  src={images.left}
                  fill
                  className={`${
                    theme === "light" ? "filter invert" : ""
                  } object-contain`}
                  alt="left_arrow"
                />
              </div>

              <div
                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                onClick={() => handleScroll("right")}
              >
                <Image
                  src={images.right}
                  fill
                  className={`${
                    theme === "light" ? "filter invert" : ""
                  } object-contain`}
                  alt="right_arrow"
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default BestCreators;
