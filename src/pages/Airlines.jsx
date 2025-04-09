// src/pages/Airlines.jsx
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Link } from 'react-router-dom';
import AirlineList from '@/components/AirlineList';
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

const Airlines = () => {
  const [airlines, setAirlines] = useState([]); // State for airlines data
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false); // State for Add dialog
  const [newAirline, setNewAirline] = useState({
    airline_id: '',
    airline_name: '',
    airport_name: ''
  });

  // Fetch initial data
  useEffect(() => {
    const fetchAirlines = async () => {
      setLoading(true);
      try {
        const data = await apiService.getAirlines();
        setAirlines(data);
      } catch (error) {
        toast.error("Failed to load airlines");
        console.error("Error fetching airlines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAirlines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Uppercase airline_id
    const processedValue = name === 'airline_id' ? value.toUpperCase() : value;
    setNewAirline(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  // Updated handleAddAirline
  const handleAddAirline = async (e) => {
    e.preventDefault();
     if (!newAirline.airline_id || !newAirline.airline_name || !newAirline.airport_name) {
      toast.error("Please fill in all fields");
      return;
    }
    const result = await apiService.addAirline(newAirline);
    if (result.success) {
      setAirlines(currentAirlines => [...currentAirlines, result.data]); // Update state
      toast.success(`Added airline: ${newAirline.airline_name}`);
      setDialogOpen(false); // Close dialog
      setNewAirline({ airline_id: '', airline_name: '', airport_name: '' }); // Reset form
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Airline Management</h1>
          <p className="text-blue-100 mt-2">View and manage airline information</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          {/* Add New Airline Button Trigger */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#e67e22] hover:bg-orange-600 flex items-center gap-2">
                    <Plus size={16} /> Add New Airline
                </Button>
            </DialogTrigger>
            {/* Add New Airline Dialog Content */}
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Airline</DialogTitle>
                <DialogDescription>Enter the details for the new airline.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAirline}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="airline_id" className="text-right">Airline ID</Label>
                    <Input id="airline_id" name="airline_id" value={newAirline.airline_id} onChange={handleInputChange} className="col-span-3 uppercase" maxLength={2} required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="airline_name" className="text-right">Name</Label>
                    <Input id="airline_name" name="airline_name" value={newAirline.airline_name} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="airport_name" className="text-right">Hub Airport</Label>
                    <Input id="airport_name" name="airport_name" value={newAirline.airport_name} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Airline</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pass state and setter to AirlineList */}
        <AirlineList airlines={airlines} setAirlines={setAirlines} />

      </main>

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Airlines;