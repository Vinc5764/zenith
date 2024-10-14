/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { Bell, LogOut, Upload, User, PlusCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from "lucide-react";
import { CircleCheckIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { uploadFile } from '@/lib/upload';


export default function AdminDashboard() {
  const [selectedPartner, setSelectedPartner] = useState('');
  const [capitalInvested, setCapitalInvested] = useState({ total: 0, portfolio1: 0, portfolio2: 0 });
  const [interestAccrued, setInterestAccrued] = useState({ total: 0, portfolio1: 0, portfolio2: 0 });
  const [equity, setEquity] = useState({ portfolio1: 0, portfolio2: 0 });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerDetails, setPartnerDetails] = useState({ name: '', email: '', contact: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
 const [customers, setCustomers] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const handleFileUpload = async(event: any) => {
    const selectedFile = event.target.files[0];
   if (selectedFile) {
      try {
        const response = await uploadFile(selectedFile);
        setUploadedFile(response.secure_url); // Adjust this based on Cloudinary response structure
        // setUploadedFile(selectedFile);
        console.log(response);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('http://localhost:3001/api/partner', {
        partnerId: selectedCustomer,
        capitalInvested,
        interestAccrued,
         equity
      });

      console.log('Data saved:', response.data);
      // Optionally show a success message or reset form fields
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   console.log('Submitting data:', { selectedPartner, capitalInvested, interestAccrued, equity, uploadedFile });
  //   // Here you would typically send the data to your backend
  // };

    useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get(`http://localhost:3001/api/partner`);
        setCustomers(
          response.data.map((customer: any) => ({
            value: customer._id,
            label: customer.name,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch customers", error);
      }
    }

    fetchCustomers();
  }, []);


const handleAddPartnerSubmit = async (e: any) => {
  e.preventDefault();
  
  if (partnerDetails.name && partnerDetails.email && partnerDetails.contact && partnerDetails.password) {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(partnerDetails),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSuccess(true);
        setError(null);
        setIsPartnerModalOpen(false);
        console.log('Partner created successfully:', data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create partner');
        setIsSuccess(false);
      }
    } catch (error) {
      setError('An error occurred while creating the partner');
      setIsSuccess(false);
      console.error('Error:', error);
    }
  } else {
    setError('All fields are required!');
    setIsSuccess(false);
  }
};


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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-between">
          <Button  size="lg" onClick={() => setIsPartnerModalOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Partner
          </Button>
          <Button  size="lg">
            View All Partners
          </Button>
        </div>

         <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Partner Selection</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 flex flex-col">
              <Label htmlFor="customer">Select Customer</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                  >
                    {selectedCustomer
                      ? customers.find(
                          (customer: any) => customer.value === selectedCustomer
                        )?.label
                      : "Select customer..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput placeholder="Search customer..." />
                    <CommandList>
                      <CommandEmpty>No customer found.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer: any) => (
                          <CommandItem
                            key={customer.value}
                            value={customer.value}
                            onSelect={(currentValue) => {
                              setSelectedCustomer(
                                currentValue === selectedCustomer
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCustomer === customer.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {customer.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
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
              {uploadedFile && <p className="mt-2 text-sm text-gray-500"><iframe
                src={uploadedFile}
                title="Uploaded File"
                width="100%"
                height="500px"
                frameBorder="0"
                style={{ border: "1px solid #ccc" }}
              /></p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* <p><strong>Selected Partner:</strong> {selectedCustomer}</p> */}
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

      {/* Add Partner Modal */}
      <Dialog open={isPartnerModalOpen} onOpenChange={setIsPartnerModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Partner</DialogTitle>
            <DialogDescription>Enter partner details to add a new partner</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPartnerSubmit} className="space-y-4">
            <div>
              <Label htmlFor="partnerName">Name</Label>
              <Input
                id="partnerName"
                type="text"
                value={partnerDetails.name}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="partnerEmail">Email</Label>
              <Input
                id="partnerEmail"
                type="email"
                value={partnerDetails.email}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="partnerContact">Contact</Label>
              <Input
                id="partnerContact"
                type="text"
                value={partnerDetails.contact}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, contact: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="partnerPassword">Password</Label>
              <Input
                id="partnerPassword"
                type="password"
                value={partnerDetails.password}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, password: e.target.value })}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={() => setIsPartnerModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Partner
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      {isSuccess && (
        <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
          <DialogContent>
            <DialogHeader>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <DialogTitle>Partner Added Successfully!</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
