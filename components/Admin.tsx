/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { Bell, LogOut, Upload, User, PlusCircle, CheckCircle, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { uploadFile } from '@/lib/upload';

export default function AdminDashboard() {
  // const [selectedPartner, setSelectedPartner] = useState('');
  const [capitalInvested, setCapitalInvested] = useState({ total: 0, portfolio1: 0, portfolio2: 0 });
  const [interestAccrued, setInterestAccrued] = useState({ total: 0, portfolio1: 0, portfolio2: 0 });
  const [equity, setEquity] = useState({ portfolio1: 0, portfolio2: 0 });
  const [uploadedFile, setUploadedFile] = useState([]);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerDetails, setPartnerDetails] = useState({ name: '', email: '', contact: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState<any>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // const handleFileUpload = async(event: any) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     try {
  //       const response = await uploadFile(selectedFile);
  //       setUploadedFile(response.secure_url);
  //       console.log(response);
  //     } catch (error) {
  //       console.error("File upload failed:", error);
  //     }
  //   }
  // };


   const handleFileUpload = async (event: any) => {
    const selectedFiles = Array.from(event.target.files); // Convert the FileList to an array
    if (selectedFiles.length > 0) {
      try {
        const fileUploadPromises = selectedFiles.map(async (file: any) => {
          const response = await uploadFile(file); // Upload each file
          return response.secure_url; // Get the file URL from the response
        });

        const uploadedFileUrls = await Promise.all(fileUploadPromises); // Wait for all files to be uploaded
        setUploadedFile((prevFiles) => [...prevFiles, ...uploadedFileUrls]); // Add new file URLs to the state
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/partner', {
        partnerId: selectedCustomer,
        capitalInvested,
        interestAccrued,
        equity,
        uploadedFile
      });
      console.log('Data saved:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

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
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}`}>Admin </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${theme === 'dark' ? 'text-[#c9a55a] hover:text-white hover:bg-[#c9a55a]' : 'text-[#001f3f] hover:text-[#c9a55a] hover:bg-gray-200'}`}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-between">
          <Button size="lg" className={`${theme === 'dark' ? 'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`} onClick={() => setIsPartnerModalOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Partner
          </Button>
          <Button size="lg" className={`${theme === 'dark' ? 'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`}>
            View All Partners
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a]' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Partner Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="customer" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Select Customer</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={`${theme === 'dark' ? 'justify-between bg-[#001f3f] text-white border-[#c9a55a] hover:bg-[#002a4f]' : 'justify-between bg-white text-[#001f3f] border-gray-300 hover:bg-gray-100'}`}
                    >
                      {selectedCustomer
                        ? customers.find(
                            (customer: any) => customer.value === selectedCustomer
                          )?.label
                        : "Select customer..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={`${theme === 'dark' ? 'bg-[#002a4f] text-white border-[#c9a55a] p-0' : 'bg-white text-[#001f3f] border-gray-300 p-0'}`}>
                    <Command className="bg-transparent">
                      <CommandInput placeholder="Search customer..." className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'} />
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
                              className={`${theme === 'dark' ? 'text-white hover:bg-[#001f3f]' : 'text-[#001f3f] hover:bg-gray-100'}`}
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

          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a]' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Capital Invested</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalCapital" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Total Capital Invested</Label>
                <Input
                  id="totalCapital"
                  type="number"
                  value={capitalInvested.total}
                  onChange={(e) => setCapitalInvested({ ...capitalInvested, total: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="portfolio1Capital" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Portfolio 1 Capital</Label>
                <Input
                  id="portfolio1Capital"
                  type="number"
                  value={capitalInvested.portfolio1}
                  onChange={(e) => setCapitalInvested({ ...capitalInvested, portfolio1: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="portfolio2Capital" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Portfolio 2 Capital</Label>
                <Input
                  id="portfolio2Capital"
                  type="number"
                  value={capitalInvested.portfolio2}
                  onChange={(e) => setCapitalInvested({ ...capitalInvested, portfolio2: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a]' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Interest Accrued</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalInterest" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Total Interest Accrued</Label>
                <Input
                  id="totalInterest"
                  type="number"
                  value={interestAccrued.total}
                  onChange={(e) => setInterestAccrued({ ...interestAccrued, total: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="portfolio1Interest" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Portfolio 1 Interest</Label>
                <Input
                  id="portfolio1Interest"
                  type="number"
                  value={interestAccrued.portfolio1}
                  onChange={(e) => setInterestAccrued({ ...interestAccrued, portfolio1: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="portfolio2Interest" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Portfolio 2 Interest</Label>
                <Input
                  id="portfolio2Interest"
                  type="number"
                  value={interestAccrued.portfolio2}
                  onChange={(e) => setInterestAccrued({ ...interestAccrued, portfolio2: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
              
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a]' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Equity Percentages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="portfolio1Equity" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Portfolio 1 Equity (%)</Label>
                <Input
                  id="portfolio1Equity"
                  type="number"
                  value={equity.portfolio1}
                  onChange={(e) => setEquity({ ...equity, portfolio1: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="portfolio2Equity" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Portfolio 2 Equity (%)</Label>
                <Input
                  id="portfolio2Equity"
                  type="number"
                  value={equity.portfolio2}
                  onChange={(e) => setEquity({ ...equity, portfolio2: parseFloat(e.target.value) })}
                  className={`${
                    theme === 'dark'
                      ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                      : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                  }`}
                />
              </div>
            </CardContent>
          </Card>

         <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a]' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Reports Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="fileUpload" className={theme === 'dark' ? 'cursor-pointer text-white' : 'cursor-pointer text-[#001f3f]'}>
          <div className={`${theme === 'dark' ? 'border-2 border-dashed border-[#c9a55a] rounded-lg p-6 text-center' : 'border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'}`}>
            <Upload className={`${theme === 'dark' ? 'mx-auto h-12 w-12 text-[#c9a55a]' : 'mx-auto h-12 w-12 text-gray-500'}`} />
            <span className={`${theme === 'dark' ? 'mt-2 block text-sm font-medium text-white' : 'mt-2 block text-sm font-medium text-[#001f3f]'}`}>
              Upload PDF reports
            </span>
          </div>
          <Input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf"
            multiple // Allow multiple files to be selected
          />
        </Label>

        {uploadedFile.length > 0 && (
          <div className={`${theme === 'dark' ? 'mt-4 p-4 bg-[#001f3f] rounded-lg' : 'mt-4 p-4 bg-gray-100 rounded-lg'}`}>
            <p className={theme === 'dark' ? 'text-sm text-white mb-2' : 'text-sm text-[#001f3f] mb-2'}>Uploaded Files:</p>
            {uploadedFile.map((fileUrl, index) => (
              <div key={index} className="mb-4">
                <iframe
                  src={fileUrl}
                  title={`Uploaded File ${index + 1}`}
                  width="100%"
                  height="300px"
                  className={`${theme === 'dark' ? 'border border-[#c9a55a] rounded' : 'border border-gray-300 rounded'}`}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
          <Card className={`${theme === 'dark' ? 'bg-[#002a4f] border-[#c9a55a]' : 'bg-white border-gray-200'}`}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}><strong>Total Capital Invested:</strong> ${capitalInvested.total}</p>
                <p className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}><strong>Total Interest Accrued:</strong> ${interestAccrued.total}</p>
                <p className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}><strong>Portfolio 1 Equity:</strong> {equity.portfolio1}%</p>
                <p className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}><strong>Portfolio 2 Equity:</strong> {equity.portfolio2}%</p>
                <p className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}><strong>Uploaded Report:</strong> {uploadedFile ? 'File uploaded' : 'No file uploaded'}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className={`${theme === 'dark' ? 'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`}>
              Submit Partner Data
            </Button>
          </div>
        </form>
      </main>

      {/* Add Partner Modal */}
      <Dialog open={isPartnerModalOpen} onOpenChange={setIsPartnerModalOpen}>
        <DialogContent className={`${theme === 'dark' ? 'bg-[#002a4f] text-white border-[#c9a55a]' : 'bg-white text-[#001f3f] border-gray-200'}`}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Add New Partner</DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Enter partner details to add a new partner</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPartnerSubmit} className="space-y-4">
            <div>
              <Label htmlFor="partnerName" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Name</Label>
              <Input
                id="partnerName"
                type="text"
                value={partnerDetails.name}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, name: e.target.value })}
                className={`${
                  theme === 'dark'
                    ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                    : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                }`}
              />
            </div>
            <div>
              <Label htmlFor="partnerEmail" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Email</Label>
              <Input
                id="partnerEmail"
                type="email"
                value={partnerDetails.email}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, email: e.target.value })}
                className={`${
                  theme === 'dark'
                    ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                    : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                }`}
              />
            </div>
            <div>
              <Label htmlFor="partnerContact" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Contact</Label>
              <Input
                id="partnerContact"
                type="text"
                value={partnerDetails.contact}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, contact: e.target.value })}
                className={`${
                  theme === 'dark'
                    ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                    : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                }`}
              />
            </div>
            <div>
              <Label htmlFor="partnerPassword" className={theme === 'dark' ? 'text-white' : 'text-[#001f3f]'}>Password</Label>
              <Input
                id="partnerPassword"
                type="password"
                value={partnerDetails.password}
                onChange={(e) => setPartnerDetails({ ...partnerDetails, password: e.target.value })}
                className={`${
                  theme === 'dark'
                    ? 'bg-[#001f3f] text-white border-[#c9a55a] focus:ring-[#c9a55a]'
                    : 'bg-white text-[#001f3f] border-gray-300 focus:ring-[#001f3f]'
                }`}
              />
            </div>
            {error && <p className={theme === 'dark' ? 'text-red-500' : 'text-red-500'}>{error}</p>}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setIsPartnerModalOpen(false)} className={`${theme === 'dark' ? 'border-[#c9a55a] text-[#c9a55a] hover:bg-[#c9a55a] hover:text-[#001f3f]' : 'border-gray-300 text-gray-500 hover:bg-gray-200 hover:text-[#001f3f]'}`}>
                Cancel
              </Button>
              <Button type="submit" className={`${theme === 'dark' ? 'bg-[#c9a55a] text-[#001f3f] hover:bg-[#d9b56a]' : 'bg-[#001f3f] text-white hover:bg-[#002a4f]'}`}>
                Add Partner
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      {isSuccess && (
        <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
          <DialogContent className={`${theme === 'dark' ? 'bg-[#002a4f] text-white border-[#c9a55a]' : 'bg-white text-[#001f3f] border-gray-200'}`}>
            <DialogHeader>
              <CheckCircle className={`${theme === 'dark' ? 'h-12 w-12 text-[#c9a55a] mx-auto' : 'h-12 w-12 text-[#001f3f] mx-auto'}`} />
              <DialogTitle className={theme === 'dark' ? 'text-[#c9a55a]' : 'text-[#001f3f]'}>Partner Added Successfully!</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}