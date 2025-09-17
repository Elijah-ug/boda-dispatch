import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientDepositThunk } from "@/features/clients/deposit/depositThunk";
import { fetchClientProfileThunk } from "@/features/clients/profiles/clientProfileThunk";
import { fetchClinetWithdrawThunk } from "@/features/clients/withdraw/clientWithdrawThunk";
import InitiateTrip from "../InitiateTrip";
import { useAccount, useWriteContract } from "wagmi";
import { bodaContractConfig, tokenContractConfig } from "@/contract/wagmiContractConfig";
import { useBodaBlocks } from "@/contract/contractConnect";
import { toast } from "react-toastify";
import { parseEther } from "ethers";

export const ClientAccess = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  // const dispatch = useDispatch();
  // const { clientProfile } = useSelector((state) => state.client);
  // const { address } = useSelector((state) => state.auth);
  const { address } = useAccount();
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

  // const handleWithdraw = () => {
  //   if (parseFloat(withdrawAmount) < 0 || isNaN(withdrawAmount)) {
  //     alert("Invalid Amount");
  //     return;
  //   }
  // dispatch(fetchClinetWithdrawThunk({ amount: ethers.parseEther(withdrawAmount) }));

  const { writeContractAsync: approveToken, pending: approvePending } = useWriteContract();
  const { writeContractAsync: allowanceToken, pending: allowancePending } = useWriteContract();
  const { writeContractAsync: depositToken, pending: depositPending } = useWriteContract();
  const { writeContractAsync: withdrawToken, pending: withdrawPending } = useWriteContract();

  const handleDepositAndWithdraw = async (func) => {
    try {
      const contractAddr = bodaContractConfig.address;
      const tokenAddr = tokenContractConfig.address;
      const parsedAmount = parseEther(depositAmount.toString());
      if (func === "deposit") {
        const approveTx = await approveToken({
          ...tokenContractConfig,
          functionName: "approve",
          args: [contractAddr, parsedAmount],
        });
        await approveTx.wait();

        const allowanceTx = await allowanceToken({
          ...tokenContractConfig,
          functionName: "allowance",
          args: [address, contractAddr],
        });
        await allowanceTx.wait();

        const depositTx = await depositToken({
          ...bodaContractConfig,
          functionName: "clientDeposit",
          args: [parsedAmount],
        });
        const receipt = await depositTx.wait();
        const txDetails = {
          txHash: String(receipt.hash),
          gasUsed: receipt.gasUsed?.toString(),
          to: String(receipt.to),
          from: String(receipt.from),
        };
        toast.success("Client deposited successfully!");
        return txDetails;
      } else if (func === "withdraw") {
        const floatAmount = parseFloat(withdrawAmount);
        const parsedWithdraw = parseEther(floatAmount.toString());
        const withdrawTx = await withdrawToken({
          ...bodaContractConfig,
          functionName: "clientWithdraw",
          args: [parsedWithdraw],
        });
        const withdraw = await withdrawTx.wait();
        const txDetails = {
          txHash: String(withdraw.hash),
          gasUsed: withdraw.gasUsed?.toString(),
          to: String(withdraw.to),
          from: String(withdraw.from),
        };
         return txDetails;
      }
     
    } catch (error) {}
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
              <Button onClick={() => handleDepositAndWithdraw("withdraw")} className="w-full">
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
