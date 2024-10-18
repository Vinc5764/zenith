/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react'
import { Download, LogOut, User, Sun, Moon } from 'lucide-react'
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useTokenStore from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function PartnerDashboard() {
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [withdrawalPortfolio, setWithdrawalPortfolio] = useState('')
  const [withdrawalReason, setWithdrawalReason] = useState('')
  const { userType, datas, setUserType,clearToken, setNames }: any = useTokenStore();
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)

   const [depositAmount, setDepositAmount] = useState("");
  const [depositPortfolio, setDepositPortfolio] = useState("");
  const [period, setPeriod] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const withdrawalData = {
      amount: depositAmount,
      portfolio: depositPortfolio,
      period: period,
    };

    try {
      // Sending the data to the backend
      const response = await fetch("/api/withdrawals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(withdrawalData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit withdrawal request.");
      }

      const result = await response.json();
      setSuccess("Withdrawal request submitted successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

const router = useRouter();
  const [theme, setTheme] = useState('dark');
 const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { id: 1, label: "Portfolio PDF 1", pdfUrl: "/pdfs/portfolio1.pdf" },
    { id: 2, label: "Portfolio PDF 2", pdfUrl: "/pdfs/portfolio2.pdf" },
    { id: 3, label: "Portfolio PDF 3", pdfUrl: "/pdfs/portfolio3.pdf" },
 ])
  
    const handleLogout = () => {
    clearToken();
    router.push("/sign-in");
  };

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
            <Button  onClick={handleLogout}
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
              <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>${datas?.user?.capitalInvested.total + datas?.user?.interestAccrued.total

}</p>
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
                    <DialogTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Initiate Deposit</DialogTitle>
                  </DialogHeader>
                 <form onSubmit={handleDepositSubmit} className="space-y-4">
      <div>
        <Label htmlFor="withdrawalAmount">Amount</Label>
        <Input
          id="withdrawalAmount"
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          required
          className={`${
            theme === "dark"
              ? "bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]"
              : "bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]"
          }`}
        />
      </div>
      <div>
        <Label htmlFor="withdrawalPortfolio">Portfolio</Label>
        <Select onValueChange={setDepositPortfolio}>
          <SelectTrigger
            className={`${
              theme === "dark"
                ? "bg-[#001f3f] text-white border-[#c9a55a]"
                : "bg-white text-[#001f3f] border-gray-300"
            }`}
          >
            <SelectValue placeholder="Select portfolio" />
          </SelectTrigger>
          <SelectContent
            className={`${
              theme === "dark" ? "bg-[#002a4f] text-white" : "bg-white text-[#001f3f]"
            }`}
          >
            <SelectItem value="Mr Kitchen">Mr Kitchen</SelectItem>
            <SelectItem value="Gidi Farms">Gidi Farms</SelectItem>
            <SelectItem value="Corebanc">Corebanc</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="withdrawalReason">Investment Period</Label>
        <Input
          id="withdrawalReason"
          value={withdrawalReason}
          onChange={(e) => setPeriod(e.target.value)}
          required
          className={`${
            theme === "dark"
              ? "bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]"
              : "bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]"
          }`}
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className={`${
          theme === "dark"
            ? "bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]"
            : "bg-[#001f3f] text-white hover:bg-[#002a4f]"
        }`}
      >
        {loading ? "Submitting..." : "Submit Request"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
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
                          <SelectItem value="Mr Kitchen">Mr Kitchen</SelectItem>
                          <SelectItem value="Gidi Farms">Gidi Farms</SelectItem>
                          <SelectItem value="Corebanc">Corebanc</SelectItem>
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
              <p className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>Total: {datas?.user?.capitalInvested.total
}</p>
              <div className="space-y-2">
                <p><strong>Mr Kitchen:</strong> {datas?.user?.capitalInvested.portfolio1
}</p>
                <p><strong>Didi Farm:</strong> ${datas?.user?.capitalInvested.portfolio2
}</p>
                 <p><strong>Corebanc:</strong> {datas?.user?.capitalInvested.portfolio3
}</p>
              </div>
            </CardContent>
          </Card>
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a] text-white' : 'bg-white border-gray-200 text-[#001f3f]'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Interest Accrued</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>Total: {datas?.user?.interestAccrued.total
}</p>
              <div className="space-y-2">
                <p><strong>Mr Kitchen:</strong>{datas?.user?.interestAccrued.portfolio1
}</p>
                <p><strong>Didi Farm:</strong> {datas?.user?.interestAccrued.portfolio1
}</p>
                 <p><strong>Corebanc:</strong> {datas?.user?.interestAccrued.portfolio1
}</p>
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
             <p><strong>Mr Kitchen:</strong> {datas?.user?.capitalInvested.portfolio1
}%</p>
                <p><strong>Didi Farm:</strong> {datas?.user?.capitalInvested.portfolio1
}%</p>
                 <p><strong>Corebanc:</strong>{datas?.user?.capitalInvested.portfolio1
}%</p>
            </div>
          </CardContent>
        </Card>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portfolio.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                <FileText className="mr-2 h-4 w-4" />
                {datas?.user?.uploadedReport.fileName
}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="bg-blue-400 w-[70px] rounded-full h-[24px] text-white text-center">
                PDF
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-2" onClick={() => setSelectedPdf(item.pdfUrl)}>
                    View PDF
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.label}</DialogTitle>
                  </DialogHeader>
                  {/* Display the selected PDF in an iframe */}
                  {selectedPdf && (
                    <iframe
                      src={datas?.user?.uploadedReport.filePath
}
                      width="100%"
                      height="500px"
                      title={item.label}
                      className="rounded-lg"
                    />
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
      </main>
    </div>
  )
}