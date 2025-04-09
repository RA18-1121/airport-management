
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AirportList from '@/components/AirportList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
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
import { toast } from "sonner";

const Airports = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAirport, setNewAirport] = useState({
    airport_name: '',
    city: '',
    state: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAirport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAirport = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to add the airport
    toast.success(`Added airport: ${newAirport.airport_name}`);
    setDialogOpen(false);
    setNewAirport({
      airport_name: '',
      city: '',
      state: ''
    });
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
          <Button 
            className="bg-[#e67e22] hover:bg-orange-600"
            onClick={() => setDialogOpen(true)}
          >
            Add New Airport
          </Button>
        </div>

        <AirportList />
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Airport</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAirport}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="airport_name" className="text-right">
                  Name
                </Label>
                <Input
                  id="airport_name"
                  name="airport_name"
                  value={newAirport.airport_name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={newAirport.city}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={newAirport.state}
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
              <Button type="submit">Add Airport</Button>
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

export default Airports;
