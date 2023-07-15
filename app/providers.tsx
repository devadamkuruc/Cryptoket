"use client";

import { NFTProvider } from "@/context/NFTContext";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NFTProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </NFTProvider>
  );
};

export default Providers;
