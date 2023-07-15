import { ParsedUrlQuery } from "querystring";

export interface NFT {
  i: number;
  image?: string;
  name: string;
  price: string;
  seller: string;
  owner: string;
  description: string;
}

export interface INFTContext {
  nftCurrency: string;
}
