"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { images } from "@/assets";

interface Props {
  activeSelect: string;
  setActiveSelect: Dispatch<SetStateAction<string>>;
  handleSearch: (value: string) => void;
  clearSearch: () => void;
}

const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
}: Props) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search, clearSearch, handleSearch]);

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 py-3 rounded-md ">
        <Image
          src={images.search}
          alt="search"
          className={`object-contain ${
            theme === "light" ? "filter invert" : ""
          }`}
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Search NFT here..."
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer  dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md"
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">
          {activeSelect}
        </p>
        <Image
          src={images.arrow}
          alt="arrow"
          className={`object-contain ${
            theme === "light" ? "filter invert" : ""
          }`}
          width={15}
          height={15}
        />

        {toggle ? (
          <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
            {[
              "Recently added",
              "Price (low to hight)",
              "Price (high to low)",
            ].map((item, index) => (
              <p
                key={index}
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)}
              >
                {item}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SearchBar;
