import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bajaji from "../assets/bajaji.png";

export default function Home() {
  const dispatch = useDispatch();
  //   const { loading, bestYield, error } = useSelector((state) => state.yield);
  //   console.log("best bestYield", bestYield.apy)
  useEffect(() => {
    // dispatch(())
  }, []);

  return (
    <div
      className="min-h-screen  px-3 sm:px-10 py-5 sm:py-10 bg-center bg-no-repeat "
      style={{
        backgroundImage: `url(${bajaji})`,
      }}
    >
      <div className=" ">
        <h2 className="font-bold text-amber-400 text-center pt-5 text-lg sm:text-4xl">
          BodaBlocks, A Decentralized Boda Boda Dispatch{" "}
        </h2>

        <div className=" flex items-center justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
            {/* <!-- Card 1: How Aggregator Works --> */}
            <div className="bg-gray-100/30 backdrop-blur-md border border-gray-200/40 shadow-md rounded-md p-6 text-white">
              <h2 className="text-xl font-bold  mb-4">⚙️ How It Works</h2>
              <p className=" leading-relaxed">
                Users register as either a Boda rider or a client. Clients deposit funds and request trips, selecting a
                rider. Once the rider completes the trip, the client confirms it, and the payment is released
                automatically to the rider using Chainlink Automation. This ensures secure, trustless, and transparent
                trip payments on-chain.
              </p>
            </div>
            {/* <!-- Card 2: Project Data --> */}
            <div className="bg-gray-100/30 backdrop-blur-md border border-gray-200/40 shadow-md rounded-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Why It Matters (Impact Card)</h2>
              <p className=" leading-relaxed">
                In many parts of Africa, informal transport systems lack transparency, safety, and trust. This dApp
                ensures that riders are fairly paid and clients only pay when a trip is complete — all enforced by smart
                contracts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
