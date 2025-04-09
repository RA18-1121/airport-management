
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FlightList from '@/components/FlightList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";

const Flights = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlight(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setNewFlight(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFlight = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to add the flight
    toast.success(`Added flight: ${newFlight.flight_number}`);
    setDialogOpen(false);
    setNewFlight({
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
          <Button 
            className="bg-[#e67e22] hover:bg-orange-600"
            onClick={() => setDialogOpen(true)}
          >
            Add New Flight
          </Button>
        </div>

        <FlightList />
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Flight</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddFlight}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="flight_number" className="text-right">
                  Flight #
                </Label>
                <Input
                  id="flight_number"
                  name="flight_number"
                  value={newFlight.flight_number}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="source" className="text-right">
                  Source
                </Label>
                <Input
                  id="source"
                  name="source"
                  value={newFlight.source}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="destination" className="text-right">
                  Destination
                </Label>
                <Input
                  id="destination"
                  name="destination"
                  value={newFlight.destination}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={newFlight.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On Time">On Time</SelectItem>
                    <SelectItem value="Delayed">Delayed</SelectItem>
                    <SelectItem value="Boarding">Boarding</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="d_time" className="text-right">
                  Departure Time
                </Label>
                <Input
                  id="d_time"
                  name="d_time"
                  value={newFlight.d_time}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="10:00 AM"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="a_time" className="text-right">
                  Arrival Time
                </Label>
                <Input
                  id="a_time"
                  name="a_time"
                  value={newFlight.a_time}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="1:00 PM"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="airline_id" className="text-right">
                  Airline ID
                </Label>
                <Input
                  id="airline_id"
                  name="airline_id"
                  value={newFlight.airline_id}
                  onChange={handleInputChange}
                  className="col-span-3"
                  maxLength={2}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="airline_name" className="text-right">
                  Airline Name
                </Label>
                <Input
                  id="airline_name"
                  name="airline_name"
                  value={newFlight.airline_name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
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

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Flights;
