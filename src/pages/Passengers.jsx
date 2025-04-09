// src/pages/Passengers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trash, Eye, Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Added Description
  DialogFooter,
  DialogClose,
  DialogTrigger, // Added Trigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select
import { apiService } from "@/services/api"; // Import apiService

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false); // State for Add dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false); // State for View dialog
  const [selectedPassenger, setSelectedPassenger] = useState(null); // State for view details
  const [newPassenger, setNewPassenger] = useState({
    passport_number: '',
    name: '',
    address: '',
    sex: 'Male',
    dob: '',
    // Removed age
    flight_number: '',
    ticket_number: ''
  });

  // Fetch initial data
  useEffect(() => {
     const fetchPassengers = async () => {
      setLoading(true);
      try {
        const data = await apiService.getPassengers();
        setPassengers(data);
      } catch (error) {
        toast.error("Failed to load passengers");
        console.error("Error fetching passengers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPassengers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPassenger(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const handleSelectChange = (name, value) => {
    setNewPassenger(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // Updated handleAddPassenger
  const handleAddPassenger = async (e) => {
    e.preventDefault();
    if (!newPassenger.passport_number || !newPassenger.name || !newPassenger.dob || !newPassenger.flight_number || !newPassenger.ticket_number) {
        toast.error("Please fill in all required fields.");
        return;
    }
    const result = await apiService.addPassenger(newPassenger);

    if (result.success) {
      // API response might include calculated age
      setPassengers(currentPassengers => [...currentPassengers, result.data]);
      toast.success(`Added passenger: ${newPassenger.name}`);
      setAddDialogOpen(false); // Close add dialog
      // Reset form
      setNewPassenger({
        passport_number: '', name: '', address: '', sex: 'Male', dob: '', flight_number: '', ticket_number: ''
      });
    }
  };

  const handleDeletePassenger = async (passportNumber) => {
    // Keep local filter for now
    try {
       // await apiService.deletePassenger(passportNumber); // Future implementation
       setPassengers(passengers.filter(passenger => passenger.passport_number !== passportNumber));
       toast.success(`Passenger with passport ${passportNumber} deleted (locally)`);
    } catch (error) {
       console.error("Error deleting passenger:", error);
       toast.error("Failed to delete passenger");
    }
  };

  // Updated handleViewDetails
  const handleViewDetails = (passportNumber) => {
    const passenger = passengers.find(p => p.passport_number === passportNumber);
     if (passenger) {
      setSelectedPassenger(passenger);
      setViewDialogOpen(true); // Open view dialog
    } else {
        toast.error("Could not find passenger details.");
    }
  };

  const filteredPassengers = passengers.filter(passenger =>
    (passenger.passport_number && passenger.passport_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (passenger.name && passenger.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (passenger.flight_number && passenger.flight_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (passenger.ticket_number && passenger.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Passenger Management</h1>
          <p className="text-blue-100 mt-2">View and manage passenger information</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          {/* Add New Passenger Button Trigger */}
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
               <Button
                className="bg-[#e67e22] hover:bg-orange-600 flex items-center gap-2"
              >
                <Plus size={16} /> Add New Passenger
              </Button>
            </DialogTrigger>
            {/* Add New Passenger Dialog Content */}
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Passenger</DialogTitle>
                <DialogDescription>Enter the details for the new passenger.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPassenger}>
                <div className="grid gap-4 py-4">
                  {/* Passport # */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passport_number" className="text-right">Passport #</Label>
                    <Input id="passport_number" name="passport_number" value={newPassenger.passport_number} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Name */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" value={newPassenger.name} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Address */}
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">Address</Label>
                    <Input id="address" name="address" value={newPassenger.address} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  {/* Sex */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sex" className="text-right">Sex</Label>
                    <Select value={newPassenger.sex} onValueChange={(value) => handleSelectChange('sex', value)}>
                      <SelectTrigger className="col-span-3"><SelectValue placeholder="Select sex" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Date of Birth */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dob" className="text-right">Date of Birth</Label>
                    <Input id="dob" name="dob" type="date" value={newPassenger.dob} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Flight # */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="flight_number" className="text-right">Flight #</Label>
                    <Input id="flight_number" name="flight_number" value={newPassenger.flight_number} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Ticket # */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ticket_number" className="text-right">Ticket #</Label>
                    <Input id="ticket_number" name="ticket_number" value={newPassenger.ticket_number} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Passenger</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-grow">
               <CardTitle className="text-2xl mb-2 md:mb-0">Passenger Records</CardTitle>
            </div>
            <div className="w-full md:w-auto md:max-w-sm">
              <Input
                placeholder="Search passengers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead>Passport #</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Flight #</TableHead>
                      <TableHead>Ticket #</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPassengers.length > 0 ? (
                      filteredPassengers.map((passenger) => (
                        <TableRow key={passenger.passport_number} className="hover:bg-blue-50">
                          <TableCell className="font-medium">{passenger.passport_number}</TableCell>
                          <TableCell>{passenger.name}</TableCell>
                          <TableCell>{passenger.age}</TableCell>
                          <TableCell>{passenger.flight_number}</TableCell>
                          <TableCell>{passenger.ticket_number}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(passenger.passport_number)} // Use updated handler
                              >
                                <Eye className="mr-1 h-4 w-4" /> View
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeletePassenger(passenger.passport_number)}
                              >
                                <Trash className="mr-1 h-4 w-4" /> Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No passengers found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* View Details Dialog */}
       <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Passenger Details</DialogTitle>
          </DialogHeader>
          {selectedPassenger && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Passport #:</Label>
                <span className="col-span-3">{selectedPassenger.passport_number}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Name:</Label>
                <span className="col-span-3">{selectedPassenger.name}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Address:</Label>
                <span className="col-span-3">{selectedPassenger.address}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Sex:</Label>
                <span className="col-span-3">{selectedPassenger.sex}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">DOB:</Label>
                <span className="col-span-3">{selectedPassenger.dob}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Age:</Label>
                <span className="col-span-3">{selectedPassenger.age}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Flight #:</Label>
                <span className="col-span-3">{selectedPassenger.flight_number}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Ticket #:</Label>
                <span className="col-span-3">{selectedPassenger.ticket_number}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Passengers;