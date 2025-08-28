
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { updateFees } from '@/features/admin/forms/updateFees';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Settings() {
    const [fee, setFee] = useState('');
    const [withdraw, setWithdraw] = useState('');
    const dispatch = useDispatch()

    const handleFeeUpdate = () => {
        if (isNaN(fee) || !fee) {
            console.log("NaN")
        }
        dispatch(updateFees({ fee: fee.toString() }));
        console.log(fee);
        setFee("")
    };
    const handleWithdraw = () => {
        if (isNaN(withdraw) || !withdraw) {
          console.log(NaN)
        }
        dispatch()
        console.log(withdraw)
        setWithdraw("")
    };
  return (
    <div className="flex  flex-col gap-6">
      <Tabs defaultValue="fee">
        <TabsList className="bg-gray-600 border-none">
          <TabsTrigger value="fee">Fees</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="fee">
          <Card className="bg-gray-700 border-none text-gray-100">
            <CardHeader>
              <CardTitle>Fees</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Update Fees</Label>
                <Input
                  id="tabs-demo-name"
                  type="number"
                  name="fee"
                  value={fee}
                  onChange={e => setFee(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleFeeUpdate}>Enter Updates</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw">
          <Card className="bg-gray-700 border-none text-gray-100">
            <CardHeader>
              <CardTitle>Withdraw</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">withdraw</Label>
                <Input
                  id="tabs-demo-new"
                  name="withdraw"
                  type="number"
                  value={withdraw}
                  onChange={e => setWithdraw(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleWithdraw}>Withdraw</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
