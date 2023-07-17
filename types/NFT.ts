import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

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
  connectWallet: () => Promise<void>;
  currentAccount?: string;
  uploadToIPFS: (file: File) => Promise<IUploadToIPFSResponse>;
  createNFT: (
    formInput: IFormInput,
    fileUrl: string,
    router: AppRouterInstance
  ) => Promise<void>;
}

export interface IUploadToIPFSResponse {
  success: boolean;
  message: string;
}

export interface IFormInput {
  name: string;
  description: string;
  price: string;
}

export interface ICreateNFTProps {
  formInput: IFormInput;
  fileURL: string;
  router: AppRouterInstance;
}
