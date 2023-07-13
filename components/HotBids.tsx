import { makeId } from "@/utils/makeId";
import { NFTCard } from "@/components";

const HotBids = () => {
  return (
    <section className="mt-10">
      <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
          Top NFTs
        </h1>

        <div>SearchBar</div>
      </div>
      <div className="mt-3 w-full grid minmd:grid-cols-5 grid-cols-4 md:grid-cols-3 mdsm:grid-cols-2 xs:grid-cols-1 gap-8 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <NFTCard
            key={`nft-${i}`}
            nft={{
              i,
              name: `Nifty NFT ${i}`,
              price: (10 - i * 0.534).toFixed(2),
              seller: `0x${makeId(3)}...${makeId(4)}`,
              owner: `0x${makeId(3)}...${makeId(4)}`,
              description: "Cool NFT on Sale",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HotBids;
