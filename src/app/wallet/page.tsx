import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WalletPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-yellow-500">Wallet</h1>

      {/* Balance Card */}
      <Card className="bg-gray-900 border-yellow-500/20">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-gray-400">Available Balance</Label>
              <p className="text-4xl font-bold text-yellow-500">$1,234.56</p>
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black">
              Withdraw
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions */}
      <Tabs defaultValue="deposit" className="space-y-4">
        <TabsList className="bg-gray-900">
          <TabsTrigger value="deposit" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Deposit
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crypto Deposit */}
            <Card className="bg-gray-900 border-yellow-500/20">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-yellow-500">Crypto Deposit</h2>
                <form className="space-y-4">
                  <div>
                    <Label>Amount (USD)</Label>
                    <Input type="number" min="10" className="bg-gray-800" />
                  </div>
                  <div>
                    <Label>Select Cryptocurrency</Label>
                    <select className="w-full p-2 bg-gray-800 rounded-md">
                      <option value="btc">Bitcoin (BTC)</option>
                      <option value="eth">Ethereum (ETH)</option>
                      <option value="usdt">Tether (USDT)</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black">
                    Generate Payment
                  </Button>
                </form>
              </div>
            </Card>

            {/* Fiat Deposit */}
            <Card className="bg-gray-900 border-yellow-500/20">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-yellow-500">Fiat Deposit</h2>
                <form className="space-y-4">
                  <div>
                    <Label>Amount (USD)</Label>
                    <Input type="number" min="10" className="bg-gray-800" />
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <select className="w-full p-2 bg-gray-800 rounded-md">
                      <option value="card">Credit/Debit Card</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black">
                    Proceed to Payment
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-gray-900 border-yellow-500/20">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-yellow-500">Transaction History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-800">
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {/* Transaction Row */}
                    <tr className="border-b border-gray-800">
                      <td className="py-4">2024-03-26</td>
                      <td className="py-4">Deposit</td>
                      <td className="py-4 text-green-500">+$100.00</td>
                      <td className="py-4 text-green-500">Completed</td>
                    </tr>
                    {/* Add more rows */}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 