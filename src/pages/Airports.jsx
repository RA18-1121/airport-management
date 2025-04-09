// src/pages/Airports.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AirportList from '@/components/AirportList'; // Correct component
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react'; // Added Plus
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { apiService } from "@/services/api"; // Import apiService

const Airports = () => {
  const [airports, setAirports] = useState([]); // State for airports data
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false); // State for Add dialog
  const [newAirport, setNewAirport] = useState({
    airport_name: '',
    city: '',
    state: ''
  });

  // Fetch initial data
  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      try {
        const data = await apiService.getAirports();
        setAirports(data);
      } catch (error) {
        toast.error("Failed to load airports");
        console.error("Error fetching airports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAirports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAirport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Updated handleAddAirport
  const handleAddAirport = async (e) => {
    e.preventDefault();
    if (!newAirport.airport_name || !newAirport.city || !newAirport.state) {
      toast.error("Please fill in all fields");
      return;
    }
    const result = await apiService.addAirport(newAirport);
    if (result.success) {
      setAirports(currentAirports => [...currentAirports, result.data]); // Update state with new data from API
      toast.success(`Added airport: ${newAirport.airport_name}`);
      setDialogOpen(false); // Close dialog
      setNewAirport({ airport_name: '', city: '', state: '' }); // Reset form
    } else {
      // Error toast is handled by apiService
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Airport Management</h1>
          <p className="text-blue-100 mt-2">View and manage airport information</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          {/* Add New Airport Button Trigger */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#e67e22] hover:bg-orange-600 flex items-center gap-2">
                <Plus size={16} /> Add New Airport
              </Button>
            </DialogTrigger>
            {/* Add New Airport Dialog Content */}
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Airport</DialogTitle>
                <DialogDescription>Enter the details for the new airport.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAirport}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="airport_name" className="text-right">Name</Label>
                    <Input id="airport_name" name="airport_name" value={newAirport.airport_name} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">City</Label>
                    <Input id="city" name="city" value={newAirport.city} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="state" className="text-right">State</Label>
                    <Input id="state" name="state" value={newAirport.state} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Airport</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pass state and setter to AirportList */}
        <AirportList airports={airports} setAirports={setAirports} />

      </main>

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Airports;