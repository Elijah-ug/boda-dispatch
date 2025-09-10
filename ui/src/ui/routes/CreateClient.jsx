// import { fetchClientProfileThunk } from "@/features/clients/profiles/clientProfileThunk";
// import { autoConnectWallet } from "@/features/wallet/connectWallet";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export const CreateClient = () => {
//   const { clientProfile } = useSelector((state) => state.client);
//   const { address } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(autoConnectWallet());
//     dispatch(fetchClientProfileThunk({ address }));
//   }, [address]);
//   console.log(clientProfile);

//   useEffect(() => {
//     if (clientProfile && clientProfile.isRegistered) {
//       fetchClientEndPoint();
//     }
//   }, [clientProfile]);
//   return <div>CreateClient</div>;
// };
