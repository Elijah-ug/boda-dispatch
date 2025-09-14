import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wallet from "./Wallet";
import { NavLink } from "react-router-dom";
// import bajaji from "../a"

export default function Home() {
  const dispatch = useDispatch();
  //   const { loading, bestYield, error } = useSelector((state) => state.yield);
  //   console.log("best bestYield", bestYield.apy)
  useEffect(() => {
    // dispatch(())
  }, []);
  const handleUpdateYield = async () => {
    try {
      const res = await fetch("http://localhost:5000/update-yield", { method: "POST" });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };
  return (
    <div className="min-h-screen  px-3 sm:px-10 py-10 ">
      <div
        className=" bg-cover bg-center  w-full bg-no-repeat  "
        style={{
          backgroundImage: `url(https://bajajverma.com/wp-content/uploads/2023/02/CT125-1_pages-to-jpg-0001-removebg-preview.png)`,
        }}
      >
        <div className=" sm:block text-end mr-10 pt-4 ">
          <Wallet />
        </div>
        <h2 className="font-bold text-amber-400 text-center pt-5 text-4xl">
          BodaBlocks, A Decentralized Boda Boda Dispatch{" "}
        </h2>

        <div className=" p-6 flex items-center justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
            {/* <!-- Card 1: How Aggregator Works --> */}
            <div className="bg-gray-400 shadow-2xl rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold  mb-4">⚙️ How It Works</h2>
              <p className=" leading-relaxed">
                Users register as either a Boda rider or a client. Clients deposit funds and request trips, selecting a
                rider. Once the rider completes the trip, the client confirms it, and the payment is released
                automatically to the rider using Chainlink Automation. This ensures secure, trustless, and transparent
                trip payments on-chain.
              </p>
            </div>
            {/* <!-- Card 2: Project Data --> */}
            <div className="bg-gray-400 shadow-2xl rounded-2xl p-6 text-white">
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
