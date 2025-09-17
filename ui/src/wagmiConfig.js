import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { base, baseSepolia, mainnet, sepolia } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "BodaBlocks",
  projectId: "ea849bc418841fcb7207cc89c7e909fe",
  chains: [mainnet, base, baseSepolia, sepolia],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_MAINNET),
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA),
    [baseSepolia.id]: http(import.meta.env.VITE_BASESEPOLIA),
    [base.id]: http(import.meta.env.VITE_BASE),
  },
});
