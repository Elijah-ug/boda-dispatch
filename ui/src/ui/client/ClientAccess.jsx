import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientDepositThunk } from "@/features/clients/deposit/depositThunk";
import { fetchClientProfileThunk } from "@/features/clients/profiles/clientProfileThunk";
import { fetchClinetWithdrawThunk } from "@/features/clients/withdraw/clientWithdrawThunk";
import InitiateTrip from "../InitiateTrip";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { bodaContractConfig, tokenContractConfig } from "@/contract/wagmiContractConfig";
import { useBodaBlocks } from "@/contract/contractConnect";
import { toast } from "react-toastify";
import { parseEther } from "ethers";
import { waitForTransactionReceipt } from "viem/actions";

export const ClientAccess = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [currentAllowance, setCurrentAllowance] = useState(0n);

  // const dispatch = useDispatch();
  // const { clientProfile } = useSelector((state) => state.client);
  // const { address } = useSelector((state) => state.auth);
  const { address } = useAccount();
  const publicClient = usePublicClient();
  // const handleDeposit = () => {
  //   const parsedAmount = parseFloat(depositAmount);
  //   if (parsedAmount < 0 || isNaN(parsedAmount)) {
  //     alert("Invalid Amount");
  //     return;
  //   }
  // dispatch(fetchClientDepositThunk({ amount: parseEther(parsedAmount.toString()) }));
  // dispatch(fetchClientProfileThunk({ address }));
  //   console.log('depositAmount: ', parsedAmount);
  //   console.log('Type of depositAmount: ', typeof parsedAmount);
  // setDepositAmount("");
  // };

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    ...tokenContractConfig,
    functionName: "allowance",
    args: [address, bodaContractConfig.address],
  });

  const {
    data: clientProfile,
    error,
    isPending,
  } = useReadContract({
    ...tokenContractConfig,
    functionName: "getClientInfo",
    args: [address],
  });

  useEffect(() => {
    if (allowance) setCurrentAllowance(allowance);
  }, [allowance]);
  useEffect(() => {
    // console.log("withdrawAmount: ", withdrawAmount);
    // console.log("typeof withdrawAmount: ", typeof withdrawAmount);
    // const parse = parseFloat(Number(withdrawAmount));
    // console.log("withdrawAmount: ", parse);
    // console.log("withdrawAmount: ", parse);
    // console.log("typeof withdrawAmount: ", typeof parse);
  }, [withdrawAmount]);
  const { writeContractAsync: approveToken, pending: approvePending } = useWriteContract();
  const { writeContractAsync: depositToken, pending: depositPending } = useWriteContract();
  const { writeContractAsync: withdrawToken, pending: withdrawPending } = useWriteContract();
  const handleDepositAndWithdraw = async (func) => {
    try {
      const contractAddr = bodaContractConfig.address;
      const tokenAddr = tokenContractConfig.address;
      const parsedAmount = parseEther(depositAmount.toString());
      if (func === "deposit") {
        if (!depositAmount || isNaN(parseFloat(depositAmount))) {
          toast.error("Invalid deposit amount");
          return;
        }

        console.log("ftriggered: ", func);
        const approveTx = await approveToken({
          ...tokenContractConfig,
          functionName: "approve",
          args: [contractAddr, parsedAmount],
        });
        const approveReceipt = await waitForTransactionReceipt(publicClient, { hash: approveTx });
        // await approveTx.wait();
        console.log("approveTx: ==> ", approveReceipt);
        const newAllowance = await refetchAllowance();
        setCurrentAllowance(newAllowance);
        console.log("Updated allowance:", newAllowance.data?.toString());

        const depositTx = await depositToken({
          ...bodaContractConfig,
          functionName: "clientDeposit",
          args: [parsedAmount],
        });
        const depositReceipt = await waitForTransactionReceipt(publicClient, { hash: depositTx });

        const txDetails = {
          txHash: String(depositReceipt.transactionHash),
          gasUsed: depositReceipt.gasUsed?.toString(),
          to: String(depositReceipt.to),
          from: String(depositReceipt.from),
        };
        setDepositAmount("");
        console.log("depositReceipt:", txDetails);
        toast.success("Client deposited successfully!");
        return txDetails;
      } else if (func === "withdraw") {
        console.log("ftriggered: ", func);
        const floatAmount = parseFloat(Number(withdrawAmount));
        const parsedWithdraw = parseEther(floatAmount.toString());
        if (!withdrawAmount || isNaN(parseFloat(withdrawAmount))) {
          toast.error("Invalid withdraw amount");
          return;
        }

        console.log("parsedWithdraw: ", parsedWithdraw);

        const withdrawTx = await withdrawToken({
          ...bodaContractConfig,
          functionName: "clientWithdraw",
          args: [parsedWithdraw],
        });
        const withdraw = await waitForTransactionReceipt(publicClient, { hash: withdrawTx });

        const txDetails = {
          txHash: String(withdraw.transactionHash),
          gasUsed: withdraw.gasUsed?.toString(),
          to: String(withdraw.to),
          from: String(withdraw.from),
        };

        console.log("withdrawReceipt:", txDetails);
        setWithdrawAmount("");
        return txDetails;
      }
    } catch (error) {
      console.error("Deposit error:", error);
      toast.error("Deposit failed. Check console for details.");
    }
  };
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="deposit">
        <TabsList className="bg-gray-700 ">
          <TabsTrigger value="deposit" className="text-green-500 ">
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw" className="text-green-500 ">
            Withdraw
          </TabsTrigger>
          <TabsTrigger value="destination" className="text-green-500 ">
            Destination
          </TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <Card className="w-full max-w-lg bg-gray-700 border-none text-white">
            <CardHeader>
              <CardTitle>Deposit</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Deposit Funds</Label>
                <Input
                  id="tabs-demo-name"
                  type="number"
                  placeholder="Amount in ETH"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleDepositAndWithdraw("deposit")} className="w-full">
                Deposit Funds
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card className="w-full max-w-lg bg-gray-700 border-none text-white">
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">💸 Withdraw Funds</Label>
                <Input
                  id="tabs-demo-current"
                  type="number"
                  placeholder="Amount to withdraw"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleDepositAndWithdraw("withdraw")}
                disabled={!withdrawAmount || isNaN(parseFloat(withdrawAmount))}
                className="w-full"
              >
                Withdraw Funds
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="destination">
          <InitiateTrip />
        </TabsContent>
      </Tabs>
    </div>
  );
};
