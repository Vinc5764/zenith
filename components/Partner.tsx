'use client';
import { useEffect, useState } from 'react'
import { Download, LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useTokenStore from '@/lib/store';
import axios from 'axios';

export default function PartnerDashboard() {
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [withdrawalPortfolio, setWithdrawalPortfolio] = useState('')
  const [withdrawalReason, setWithdrawalReason] = useState('')
const { userType, datas, setUserType, setNames }: any = useTokenStore();
  const handleWithdrawalSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the withdrawal request to your backend
    console.log('Withdrawal request:', { withdrawalAmount, withdrawalPortfolio, withdrawalReason })
  }


   useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/partner/partner-details`, {
          params: {
            partner: datas._id,
          },
        });
        console.log(response.data);
        // setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [datas._id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">{datas?.user.name}</span>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$1,000,000</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>View Bank Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bank Account Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <p><strong>Bank Name:</strong> Example Bank</p>
                    <p><strong>Account Number:</strong> XXXX-XXXX-XXXX-1234</p>
                    <p><strong>Routing Number:</strong> 123456789</p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Request Withdrawal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdrawal Request</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="withdrawalAmount">Amount</Label>
                      <Input
                        id="withdrawalAmount"
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="withdrawalPortfolio">Portfolio</Label>
                      <Select onValueChange={setWithdrawalPortfolio}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select portfolio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portfolio1">Portfolio 1</SelectItem>
                          <SelectItem value="portfolio2">Portfolio 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="withdrawalReason">Reason</Label>
                      <Input
                        id="withdrawalReason"
                        value={withdrawalReason}
                        onChange={(e) => setWithdrawalReason(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit">Submit Request</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Capital Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Total: $750,000</p>
              <div className="space-y-2">
                <p><strong>Portfolio 1:</strong> $400,000</p>
                <p><strong>Portfolio 2:</strong> $350,000</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Interest Accrued</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Total: $250,000</p>
              <div className="space-y-2">
                <p><strong>Portfolio 1:</strong> $150,000</p>
                <p><strong>Portfolio 2:</strong> $100,000</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Equity Percentages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Portfolio 1:</strong> 60%</p>
              <p><strong>Portfolio 2:</strong> 40%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download Latest Report
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}