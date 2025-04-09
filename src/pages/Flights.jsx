// src/pages/Flights.jsx
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Link } from 'react-router-dom';
import FlightList from '@/components/FlightList';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { apiService } from "@/services/api"; // Import apiService

const Flights = () => {
  const [flights, setFlights] = useState([]); // State for flights data
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false); // State for Add dialog
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    source: '',
    destination: '',
    status: 'On Time',
    d_time: '',
    a_time: '',
    connected: 'No',
    duration: '',
    airline_id: '',
    airline_name: ''
  });

   // Fetch initial data
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const data = await apiService.getFlights();
        setFlights(data);
      } catch (error) {
        toast.error("Failed to load flights");
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     // Uppercase airline_id
    const processedValue = name === 'airline_id' ? value.toUpperCase() : value;
    setNewFlight(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSelectChange = (name, value) => {
    setNewFlight(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Updated handleAddFlight
  const handleAddFlight = async (e) => {
    e.preventDefault();
     // Add more validation as needed
    if (!newFlight.flight_number || !newFlight.source || !newFlight.destination || !newFlight.d_time || !newFlight.a_time || !newFlight.airline_id || !newFlight.airline_name) {
      toast.error("Please fill in all required fields");
      return;
    }
    const result = await apiService.addFlight(newFlight);
    if (result.success) {
        setFlights(currentFlights => [...currentFlights, result.data]); // Update state
        toast.success(`Added flight: ${newFlight.flight_number}`);
        setDialogOpen(false); // Close dialog
        // Reset form
        setNewFlight({
            flight_number: '', source: '', destination: '', status: 'On Time', d_time: '', a_time: '', connected: 'No', duration: '', airline_id: '', airline_name: ''
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Flight Management</h1>
          <p className="text-blue-100 mt-2">View and manage flight information</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          {/* Add New Flight Button Trigger */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
               <Button className="bg-[#e67e22] hover:bg-orange-600 flex items-center gap-2">
                   <Plus size={16}/> Add New Flight
               </Button>
            </DialogTrigger>
            {/* Add New Flight Dialog Content */}
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Flight</DialogTitle>
                <DialogDescription>Enter the details for the new flight.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddFlight}>
                <div className="grid gap-4 py-4">
                  {/* Flight Number */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="flight_number" className="text-right">Flight #</Label>
                    <Input id="flight_number" name="flight_number" value={newFlight.flight_number} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Source */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="source" className="text-right">Source</Label>
                    <Input id="source" name="source" value={newFlight.source} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Destination */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="destination" className="text-right">Destination</Label>
                    <Input id="destination" name="destination" value={newFlight.destination} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Status */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Status</Label>
                    <Select value={newFlight.status} onValueChange={(value) => handleSelectChange('status', value)}>
                      <SelectTrigger className="col-span-3"><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="On Time">On Time</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                        <SelectItem value="Boarding">Boarding</SelectItem>
                        <SelectItem value="Departed">Departed</SelectItem>
                        <SelectItem value="Arrived">Arrived</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Departure Time */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="d_time" className="text-right">Departure Time</Label>
                    <Input id="d_time" name="d_time" type="text" placeholder="e.g., 10:00 AM or 14:30" value={newFlight.d_time} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                   {/* Arrival Time */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="a_time" className="text-right">Arrival Time</Label>
                    <Input id="a_time" name="a_time" type="text" placeholder="e.g., 1:00 PM or 16:45" value={newFlight.a_time} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Duration */}
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">Duration</Label>
                    <Input id="duration" name="duration" type="text" placeholder="e.g., 3h 15m" value={newFlight.duration} onChange={handleInputChange} className="col-span-3" />
                  </div>
                   {/* Connected */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="connected" className="text-right">Connected</Label>
                    <Select value={newFlight.connected} onValueChange={(value) => handleSelectChange('connected', value)}>
                      <SelectTrigger className="col-span-3"><SelectValue placeholder="Select connection" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Airline ID */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="airline_id" className="text-right">Airline ID</Label>
                    <Input id="airline_id" name="airline_id" value={newFlight.airline_id} onChange={handleInputChange} className="col-span-3 uppercase" maxLength={2} required />
                  </div>
                  {/* Airline Name */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="airline_name" className="text-right">Airline Name</Label>
                    <Input id="airline_name" name="airline_name" value={newFlight.airline_name} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Flight</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pass state and setter to FlightList */}
        <FlightList flights={flights} setFlights={setFlights} />

      </main>

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Flights;