'use client';
import { useEffect, useState } from 'react'
import { Download, LogOut, User, Sun, Moon } from 'lucide-react'
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
  const [theme, setTheme] = useState('dark');

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

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#001f3f] text-white' : 'bg-gray-100 text-[#001f3f]'}`}>
      <header className={`${theme === 'dark' ? 'bg-[#002a4f]' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}`}>Partner Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className={`${theme === 'dark' ? 'text-[#c9a55a] hover:text-white hover:bg-[#c9a55a]' : 'text-[#001f3f] hover:text-[#c9a55a] hover:bg-gray-200'}`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <User className={`h-5 w-5 ${theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}`} />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>{datas?.user?.name}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className={`${theme === 'dark' ? 'text-[#c9a55a] border-[#c9a55a] hover:bg-[#c9a55a] hover:text-[#001f3f]' : 'text-[#001f3f] border-[#001f3f] hover:bg-[#001f3f] hover:text-white'}`}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Total Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>$1,000,000</p>
            </CardContent>
          </Card>
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className={`${theme === 'dark' ? 'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`}>View Bank Details</Button>
                </DialogTrigger>
                <DialogContent className={`${theme === 'dark' ? 'bg-[#002a4f] text-white' : 'bg-white text-[#001f3f]'}`}>
                  <DialogHeader>
                    <DialogTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Bank Account Details</DialogTitle>
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
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className={`${theme === 'dark' ? 'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`}>Request Withdrawal</Button>
                </DialogTrigger>
                <DialogContent className={`${theme === 'dark' ? 'bg-[#002a4f] text-white' : 'bg-white text-[#001f3f]'}`}>
                  <DialogHeader>
                    <DialogTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Withdrawal Request</DialogTitle>
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
                        className={`${theme === 'dark' ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]' : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="withdrawalPortfolio">Portfolio</Label>
                      <Select onValueChange={setWithdrawalPortfolio}>
                        <SelectTrigger className={`${theme === 'dark' ? 'bg-[#001f3f] text-white border-[#c9a55a]' : 'bg-white text-[#001f3f] border-gray-300'}`}>
                          <SelectValue placeholder="Select portfolio" />
                        </SelectTrigger>
                        <SelectContent className={`${theme === 'dark' ? 'bg-[#002a4f] text-white' : 'bg-white text-[#001f3f]'}`}>
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
                        className={`${theme === 'dark' ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]' : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'}`}
                      />
                    </div>
                    <Button type="submit" className={`${theme === 'dark' ? 'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`}>Submit Request</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Capital Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>Total: $750,000</p>
              <div className="space-y-2">
                <p><strong>Portfolio 1:</strong> $400,000</p>
                <p><strong>Portfolio 2:</strong> $350,000</p>
              </div>
            </CardContent>
          </Card>
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Interest Accrued</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>Total: $250,000</p>
              <div className="space-y-2">
                <p><strong>Portfolio 1:</strong> $150,000</p>
                <p><strong>Portfolio 2:</strong> $100,000</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={`mb-8 ${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Equity Percentages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Portfolio 1:</strong> 60%</p>
              <p><strong>Portfolio 2:</strong> 40%</p>
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
          <CardHeader>
            <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Portfolio Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className={`${theme === 'dark' ?   'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`}>
              <Download className="mr-2 h-4 w-4" />
              Download Latest Report
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}