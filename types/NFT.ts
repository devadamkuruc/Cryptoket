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
  connectWallet?: () => Promise<void>;
  currentAccount?: string;
  uploadToIPFS?: (file: File) => Promise<IUploadToIPFSResponse>;
}

export interface IUploadToIPFSResponse {
  success: boolean;
  message: string;
}
