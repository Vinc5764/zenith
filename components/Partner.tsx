/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react'
import { LogOut, User, Sun, Moon } from 'lucide-react'
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
  const {  datas,clearToken }: any = useTokenStore();
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

    console.log(withdrawalData, withdrawalPortfolio);
    

    try {
      // Sending the data to the backend
      // const response = await fetch("https://zenith-seven-mauve.vercel.app/api/withdrawals", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(withdrawalData),
      // });

      alert("Deposit request sent successfully")

      // if (!response.ok) {
      //   throw new Error("Failed to submit withdrawal request.");
      // }

      //  await response.json();
      // setSuccess("Withdrawal request submitted successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

const router = useRouter();
  const [theme, setTheme] = useState('light');
//  const [portfolio, setPortfolio] = useState<any>([
//     { id: 1, label: "Portfolio PDF 1", pdfUrl: "/pdfs/portfolio1.pdf" },
//     { id: 2, label: "Portfolio PDF 2", pdfUrl: "/pdfs/portfolio2.pdf" },
//     { id: 3, label: "Portfolio PDF 3", pdfUrl: "/pdfs/portfolio3.pdf" },
//  ])
  
    const handleLogout = () => {
    clearToken();
    router.push("/sign-in");
  };

  const handleWithdrawalSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the withdrawal request to your backend
    alert('Withdrawal request submitted successfully u will be contacted shortly')
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`https://kanassetmanagement.com/api/partner/partner-details`, {
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
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}`}>KAN</h1>
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
        <Card
  className={`transition-transform transform hover:scale-105 duration-300 shadow-lg rounded-lg ${
    theme === 'dark'
      ? 'bg-[#002a4f] border-[#c9a55a] text-white'
      : 'bg-white border-gray-200 text-[#001f3f]'
  } border p-6`}
>
  <CardHeader className="mb-4">
    <CardTitle
      className={`text-lg font-semibold ${
        theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'
      }`}
    >
      Total Assets
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p
      className={`text-4xl font-extrabold ${
        theme === 'dark' ? 'text-white' : 'text-[#001f3f]'
      }`}
    >
      $
      {datas?.user?.capitalInvested.total +
        datas?.user?.interestAccrued.total}
    </p>
    <p
      className={`mt-2 text-sm ${
        theme === 'dark' ? 'text-[#c9a55a]' : 'text-gray-500'
      }`}
    >
      Updated balance including investments and interest accrued
    </p>
  </CardContent>
</Card>

         <Card
  className={`transition-transform transform hover:scale-105 duration-300 shadow-lg rounded-lg ${
    theme === 'dark'
      ? 'bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#002a4f] border-[#FFD700] text-white'
      : 'bg-gradient-to-r from-[#E0F7FF] to-[#80D4FF] border-gray-300 text-[#003366]'
  } border p-6`}
>
  <CardHeader className="mb-4">
    <CardTitle
      className={`text-lg font-semibold ${
        theme === 'dark' ? 'text-[#FFD700]' : 'text-[#003366]'
      }`}
    >
      Deposits
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-[#FFD700] text-[#001f3f] hover:bg-[#FFE34D]'
              : 'bg-[#003366] text-white hover:bg-[#004080]'
          } font-bold px-4 py-2 rounded`}
        >
          Initiate
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`rounded-lg p-6 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#002a4f] text-white'
            : 'bg-white text-[#003366]'
        }`}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-[#FFD700]' : 'text-[#003366]'
            }`}
          >
            Initiate Deposit
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleDepositSubmit} className="space-y-4">
          <div>
            <Label htmlFor="depositAmount">Amount</Label>
            <Input
              id="depositAmount"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              required
              className={`rounded-lg ${
                theme === 'dark'
                  ? 'bg-[#001f3f] text-white border-[#FFD700] focus:ring-[#FFD700]'
                  : 'bg-white text-[#003366] border-gray-300 focus:ring-[#003366]'
              } px-4 py-2`}
            />
          </div>
          <div>
            <Label htmlFor="depositPortfolio">Portfolio</Label>
            <Select onValueChange={setDepositPortfolio}>
              <SelectTrigger
                className={`rounded-lg ${
                  theme === 'dark'
                    ? 'bg-[#001f3f] text-white border-[#FFD700]'
                    : 'bg-white text-[#003366] border-gray-300'
                } px-4 py-2`}
              >
                <SelectValue placeholder="Select portfolio" />
              </SelectTrigger>
              <SelectContent
                className={`rounded-lg ${
                  theme === 'dark'
                    ? 'bg-[#002a4f] text-white'
                    : 'bg-white text-[#003366]'
                }`}
              >
                <SelectItem value="Mr Kitchen">Mr Kitchen</SelectItem>
                <SelectItem value="Gidi Farms">Gidi Farms</SelectItem>
                <SelectItem value="Corebanc">Corebanc</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="investmentPeriod">Investment Period</Label>
            <Input
              id="investmentPeriod"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
              className={`rounded-lg ${
                theme === 'dark'
                  ? 'bg-[#001f3f] text-white border-[#FFD700] focus:ring-[#FFD700]'
                  : 'bg-white text-[#003366] border-gray-300 focus:ring-[#003366]'
              } px-4 py-2`}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold transition-colors duration-300 rounded-lg ${
              theme === 'dark'
                ? 'bg-[#FFD700] text-[#001f3f] hover:bg-[#FFE34D]'
                : 'bg-[#003366] text-white hover:bg-[#004080]'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </DialogContent>
    </Dialog>
  </CardContent>
</Card>

        <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-[#003f6f] to-[#001f3f] border-[#5a9bc9] text-white' : 'bg-gradient-to-r from-[#f0f8ff] to-[#d0e8ff] border-[#b3c6e0] text-[#001f3f]'}`}>
  <CardHeader>
    <CardTitle className={theme === 'dark' ? 'text-[#5a9bc9]' : 'text-[#001f3f]'}>Withdrawals</CardTitle>
  </CardHeader>
  <CardContent>
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`${theme === 'dark' ? 'bg-[#5a9bc9] text-[#001f3f] hover:bg-[#7fb7e1]' : 'bg-[#001f3f] text-white hover:bg-[#003f6f]'}`}>
          Request Withdrawal
        </Button>
      </DialogTrigger>
      <DialogContent className={`${theme === 'dark' ? 'bg-gradient-to-r from-[#003f6f] to-[#001f3f] text-white' : 'bg-gradient-to-r from-[#f0f8ff] to-[#d0e8ff] text-[#001f3f]'}`}>
        <DialogHeader>
          <DialogTitle className={theme === 'dark' ? 'text-[#5a9bc9]' : 'text-[#001f3f]'}>Withdrawal Request</DialogTitle>
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
              className={`${theme === 'dark' ? 'bg-[#001f3f] text-white border-[#5a9bc9] focus:ring-[#5a9bc9]' : 'bg-white text-[#001f3f] border-[#b3c6e0] focus:ring-[#001f3f]'}`}
            />
          </div>
          <div>
            <Label htmlFor="withdrawalPortfolio">Portfolio</Label>
            <Select onValueChange={setWithdrawalPortfolio}>
              <SelectTrigger className={`${theme === 'dark' ? 'bg-[#001f3f] text-white border-[#5a9bc9]' : 'bg-white text-[#001f3f] border-[#b3c6e0]'}`}>
                <SelectValue placeholder="Select portfolio" />
              </SelectTrigger>
              <SelectContent className={`${theme === 'dark' ? 'bg-gradient-to-r from-[#003f6f] to-[#001f3f] text-white' : 'bg-gradient-to-r from-[#f0f8ff] to-[#d0e8ff] text-[#001f3f]'}`}>
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
              className={`${theme === 'dark' ? 'bg-[#001f3f] text-white border-[#5a9bc9] focus:ring-[#5a9bc9]' : 'bg-white text-[#001f3f] border-[#b3c6e0] focus:ring-[#001f3f]'}`}
            />
          </div>
          <Button type="submit" className={`${theme === 'dark' ? 'bg-[#5a9bc9] text-[#001f3f] hover:bg-[#7fb7e1]' : 'bg-[#001f3f] text-white hover:bg-[#003f6f]'}`}>
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </CardContent>
</Card>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-[#0d2741] to-[#1a4261] border border-[#5a9bc9] text-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out' : 'bg-white border border-[#e0e7ff] text-[#001f3f] rounded-xl shadow-lg p-6 transition duration-300 ease-in-out'}`}>
  <CardHeader className="mb-4">
    <CardTitle className={`${theme === 'dark' ? 'text-[#7fb7e1] text-2xl font-semibold' : 'text-[#001f3f] text-2xl font-semibold'}`}>
      Capital Invested
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className={`text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>
      ${datas?.user?.capitalInvested.total}
    </p>
    <div className="space-y-4">
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Mr Kitchen:</strong> ${datas?.user?.capitalInvested.portfolio1}
        </p>
      </div>
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Didi Farm:</strong> ${datas?.user?.capitalInvested.portfolio2}
        </p>
      </div>
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Corebanc:</strong> ${datas?.user?.capitalInvested.portfolio3}
        </p>
      </div>
    </div>
  </CardContent>
</Card>


          <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-[#0d2741] to-[#1a4261] border border-[#c9a55a] text-white rounded-xl shadow-lg p-6 transition duration-300 ease-in-out' : 'bg-white border border-[#e0e7ff] text-[#001f3f] rounded-xl shadow-lg p-6 transition duration-300 ease-in-out'}`}>
  <CardHeader className="mb-4">
    <CardTitle className={`${theme === 'dark' ? 'text-[#c9a55a] text-2xl font-semibold' : 'text-[#001f3f] text-2xl font-semibold'}`}>
      Interest Accrued
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className={`text-4xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>
      Total: ${datas?.user?.interestAccrued.total}
    </p>
    <div className="space-y-4">
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Mr Kitchen:</strong> ${datas?.user?.interestAccrued.portfolio1}
        </p>
      </div>
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Didi Farm:</strong> ${datas?.user?.interestAccrued.portfolio2}
        </p>
      </div>
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Corebanc:</strong> ${datas?.user?.interestAccrued.portfolio3}
        </p>
      </div>
    </div>
  </CardContent>
</Card>

        </div>

       <Card className={`mb-8 p-6 md:w-1/2 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gradient-to-r from-[#0d2741] to-[#1a4261] border border-[#c9a55a] text-white' : 'bg-white border border-gray-200 text-[#001f3f]'}`}>
  <CardHeader className="mb-4">
    <CardTitle className={`${theme === 'dark' ? 'text-[#c9a55a] text-2xl font-semibold' : 'text-[#001f3f] text-2xl font-semibold'}`}>
      Equity Percentages
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Mr Kitchen:</strong> {datas?.user?.equity.portfolio1}%
        </p>
      </div>
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Didi Farm:</strong> {datas?.user?.equity.portfolio2}%
        </p>
      </div>
      <div className={`${theme === 'dark' ? 'bg-[#1a4261] text-white p-4 rounded-lg hover:shadow-md transition duration-300' : 'bg-[#f5f7ff] text-[#001f3f] p-4 rounded-lg hover:shadow-md transition duration-300'}`}>
        <p className="text-lg font-medium">
          <strong>Corebanc:</strong> {datas?.user?.equity.portfolio3}%
        </p>
      </div>
    </div>
  </CardContent>
</Card>


       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {datas?.user?.uploadedReport?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                <FileText className="mr-2 h-4 w-4" />
                {item.fileName
}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="bg-blue-400 w-[70px] rounded-full h-[24px] text-white text-center">
                PDF
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-2" onClick={() => setSelectedPdf(item.filePath)}>
                    View PDF
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.fileName}</DialogTitle>
                  </DialogHeader>
                  {/* Display the selected PDF in an iframe */}
                  {selectedPdf && (
                    <iframe
                      src={selectedPdf
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