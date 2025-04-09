
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AirlineList from '@/components/AirlineList';
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
import { toast } from "sonner";

const Airlines = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAirline, setNewAirline] = useState({
    airline_id: '',
    airline_name: '',
    airport_name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAirline(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAirline = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to add the airline
    toast.success(`Added airline: ${newAirline.airline_name}`);
    setDialogOpen(false);
    setNewAirline({
      airline_id: '',
      airline_name: '',
      airport_name: ''
    });
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
          <Button 
            className="bg-[#e67e22] hover:bg-orange-600"
            onClick={() => setDialogOpen(true)}
          >
            Add New Airline
          </Button>
        </div>

        <AirlineList />
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Airline</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAirline}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="airline_id" className="text-right">
                  Airline ID
                </Label>
                <Input
                  id="airline_id"
                  name="airline_id"
                  value={newAirline.airline_id}
                  onChange={handleInputChange}
                  className="col-span-3"
                  maxLength={2}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="airline_name" className="text-right">
                  Name
                </Label>
                <Input
                  id="airline_name"
                  name="airline_name"
                  value={newAirline.airline_name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="airport_name" className="text-right">
                  Hub Airport
                </Label>
                <Input
                  id="airport_name"
                  name="airport_name"
                  value={newAirline.airport_name}
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
              <Button type="submit">Add Airline</Button>
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

export default Airlines;
