import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia, mainnet } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "BodaBlocks",
  projectId: "ea849bc418841fcb7207cc89c7e909fe",
  chains: [mainnet, base, baseSepolia],
});
