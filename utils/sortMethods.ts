import { SortingMethod } from "@/types/NFT";

export const sortMethods: Record<string, { method: SortingMethod }> = {
  "Price(low to high)": {
    method: (a, b) => parseFloat(a.price) - parseFloat(b.price),
  },
  "Price(high to low)": {
    method: (a, b) => parseFloat(b.price) - parseFloat(a.price),
  },
  "Recently added": {
    method: (a, b) => b.tokenId - a.tokenId,
  },
};
