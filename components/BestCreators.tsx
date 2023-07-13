"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";

import { CreatorCard } from "@/components";
import { makeId } from "@/utils/makeId";
import { images } from "../assets";

const BestCreators = () => {
  const [hideButtons, setHideButtons] = useState(false);
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <CreatorCard
              key={`creator-${i}`}
              rank={i}
              creatorImage={images[`creator${i}`]}
              creatorName={`0x${makeId(3)}...${makeId(4)}`}
              creatorEths={10 - i * 0.5}
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
                  layout="fill"
                  objectFit="contain"
                  className={theme === "light" ? "filter invert" : ""}
                  alt="left_arrow"
                />
              </div>

              <div
                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                onClick={() => handleScroll("right")}
              >
                <Image
                  src={images.right}
                  layout="fill"
                  objectFit="contain"
                  className={theme === "light" ? "filter invert" : ""}
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
