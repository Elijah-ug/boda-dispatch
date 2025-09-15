import { AppWindowIcon, CodeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientDepositThunk } from "@/features/clients/deposit/depositThunk";
import { fetchClientProfileThunk } from "@/features/clients/profiles/clientProfileThunk";
import { fetchClinetWithdrawThunk } from "@/features/clients/withdraw/clientWithdrawThunk";
import InitiateTrip from "../InitiateTrip";

export const ClientAccess = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const dispatch = useDispatch();
  const { clientProfile } = useSelector((state) => state.client);
  const { address } = useSelector((state) => state.auth);
  const handleDeposit = () => {
    const parsedAmount = parseFloat(depositAmount);
    if (parsedAmount < 0 || isNaN(parsedAmount)) {
      alert("Invalid Amount");
      return;
    }
    dispatch(fetchClientDepositThunk({ amount: parseEther(parsedAmount.toString()) }));
    dispatch(fetchClientProfileThunk({ address }));
    //   console.log('depositAmount: ', parsedAmount);
    //   console.log('Type of depositAmount: ', typeof parsedAmount);
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    if (parseFloat(withdrawAmount) < 0 || isNaN(withdrawAmount)) {
      alert("Invalid Amount");
      return;
    }
    dispatch(fetchClinetWithdrawThunk({ amount: ethers.parseEther(withdrawAmount) }));
  };
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="deposit">
        <TabsList className="bg-gray-700 " >
          <TabsTrigger value="deposit" className="text-green-500 ">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw" className="text-green-500 ">Withdraw</TabsTrigger>
          <TabsTrigger value="new" className="text-green-500 ">New</TabsTrigger>
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
              <Button onClick={handleDeposit} className="w-full">
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
              <Button onClick={handleWithdraw} className="w-full">
                Withdraw Funds
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <InitiateTrip />
        </TabsContent>
      </Tabs>
    </div>
  );
};
