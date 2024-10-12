'use client';
import { useState } from 'react'
import { Bell, LogOut, Upload, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"

export default function AdminDashboard() {
  const [selectedPartner, setSelectedPartner] = useState('')
  const [capitalInvested, setCapitalInvested] = useState({ total: 0, portfolio1: 0, portfolio2: 0 })
  const [interestAccrued, setInterestAccrued] = useState({ total: 0, portfolio1: 0, portfolio2: 0 })
  const [equity, setEquity] = useState({ portfolio1: 0, portfolio2: 0 })
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
    } else {
      alert('Please upload a PDF file')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Submitting data:', { selectedPartner, capitalInvested, interestAccrued, equity, uploadedFile })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">CAN Partner</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Admin Name</span>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Partner Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSelectedPartner}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner1">Partner 1</SelectItem>
                  <SelectItem value="partner2">Partner 2</SelectItem>
                  <SelectItem value="partner3">Partner 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Capital Invested</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalCapital">Total Capital Invested</Label>
                <Input
                  id="totalCapital"
                  type="number"
                  value={capitalInvested.total}
                  onChange={(e) => setCapitalInvested({ ...capitalInvested, total: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="portfolio1Capital">Portfolio 1 Capital</Label>
                <Input
                  id="portfolio1Capital"
                  type="number"
                  value={capitalInvested.portfolio1}
                  onChange={(e) => setCapitalInvested({ ...capitalInvested, portfolio1: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="portfolio2Capital">Portfolio 2 Capital</Label>
                <Input
                  id="portfolio2Capital"
                  type="number"
                  value={capitalInvested.portfolio2}
                  onChange={(e) => setCapitalInvested({ ...capitalInvested, portfolio2: parseFloat(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interest Accrued</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalInterest">Total Interest Accrued</Label>
                <Input
                  id="totalInterest"
                  type="number"
                  value={interestAccrued.total}
                  onChange={(e) => setInterestAccrued({ ...interestAccrued, total: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="portfolio1Interest">Portfolio 1 Interest</Label>
                <Input
                  id="portfolio1Interest"
                  type="number"
                  value={interestAccrued.portfolio1}
                  onChange={(e) => setInterestAccrued({ ...interestAccrued, portfolio1: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="portfolio2Interest">Portfolio 2 Interest</Label>
                <Input
                  id="portfolio2Interest"
                  type="number"
                  value={interestAccrued.portfolio2}
                  onChange={(e) => setInterestAccrued({ ...interestAccrued, portfolio2: parseFloat(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equity Percentages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="portfolio1Equity">Portfolio 1 Equity (%)</Label>
                <Input
                  id="portfolio1Equity"
                  type="number"
                  value={equity.portfolio1}
                  onChange={(e) => setEquity({ ...equity, portfolio1: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="portfolio2Equity">Portfolio 2 Equity (%)</Label>
                <Input
                  id="portfolio2Equity"
                  type="number"
                  value={equity.portfolio2}
                  onChange={(e) => setEquity({ ...equity, portfolio2: parseFloat(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="fileUpload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload PDF report
                  </span>
                </div>
                <Input id="fileUpload" type="file" className="hidden" onChange={handleFileUpload} accept=".pdf" />
              </Label>
              {uploadedFile && <p className="mt-2 text-sm text-gray-500">{uploadedFile.name}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Selected Partner:</strong> {selectedPartner}</p>
                <p><strong>Total Capital Invested:</strong> ${capitalInvested.total}</p>
                <p><strong>Total Interest Accrued:</strong> ${interestAccrued.total}</p>
                <p><strong>Portfolio 1 Equity:</strong> {equity.portfolio1}%</p>
                <p><strong>Portfolio 2 Equity:</strong> {equity.portfolio2}%</p>
                <p><strong>Uploaded Report:</strong> {uploadedFile ? uploadedFile.name : 'No file uploaded'}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Submit Partner Data
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}