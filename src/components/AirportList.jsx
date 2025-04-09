
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiService } from "@/services/api";
import { Link } from 'react-router-dom';
import { Trash, Eye, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AirportList = ({ preview = false }) => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAirport, setNewAirport] = useState({
    airport_name: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await apiService.getAirports();
        setAirports(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching airports:", error);
        toast.error("Failed to load airports");
        setLoading(false);
      }
    };
    
    fetchAirports();
  }, []);

  const handleDeleteAirport = async (airportName) => {
    try {
      // In a real app with a backend, you would call an API endpoint
      // await apiService.deleteAirport(airportName);
      
      // For now, we'll just filter the airport out of the local state
      setAirports(airports.filter(airport => airport.airport_name !== airportName));
      toast.success(`Airport ${airportName} deleted`);
    } catch (error) {
      console.error("Error deleting airport:", error);
      toast.error("Failed to delete airport");
    }
  };

  const handleViewDetails = (airportName) => {
    const airport = airports.find(a => a.airport_name === airportName);
    if (airport) {
      toast.info(
        <div>
          <h3 className="font-semibold text-lg">{airport.airport_name}</h3>
          <p>City: {airport.city}</p>
          <p>State: {airport.state}</p>
        </div>
      );
    }
  };

  const handleAddAirport = () => {
    // Validate inputs
    if (!newAirport.airport_name || !newAirport.city || !newAirport.state) {
      toast.error("Please fill in all fields");
      return;
    }

    // Add to local state
    const updatedAirports = [...airports, newAirport];
    setAirports(updatedAirports);
    
    // Reset form and close dialog
    setNewAirport({ airport_name: '', city: '', state: '' });
    setIsAddDialogOpen(false);
    toast.success(`Airport ${newAirport.airport_name} added`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAirport({
      ...newAirport,
      [name]: value,
    });
  };

  const filteredAirports = airports.filter(airport => 
    airport.airport_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedAirports = preview ? filteredAirports.slice(0, 3) : filteredAirports;

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card>
      {!preview && (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Airport Information</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="ml-auto">
                <Plus className="mr-2 h-4 w-4" /> Add New Airport
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Airport</DialogTitle>
                <DialogDescription>
                  Enter the details of the new airport below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="airport_name" className="text-right">
                    Airport Name
                  </Label>
                  <Input
                    id="airport_name"
                    name="airport_name"
                    value={newAirport.airport_name}
                    onChange={handleInputChange}
                    className="col-span-3"
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
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAirport}>Add Airport</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input
              placeholder="Search airports by name, city, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead>Airport Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                {!preview && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedAirports.length > 0 ? (
                displayedAirports.map((airport, index) => (
                  <TableRow key={index} className="hover:bg-blue-50">
                    <TableCell className="font-medium">{airport.airport_name}</TableCell>
                    <TableCell>{airport.city}</TableCell>
                    <TableCell>{airport.state}</TableCell>
                    {!preview && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(airport.airport_name)}
                          >
                            <Eye className="mr-1 h-4 w-4" /> View
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteAirport(airport.airport_name)}
                          >
                            <Trash className="mr-1 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={preview ? 3 : 4} className="text-center py-4">
                    No airports found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {preview && (
          <div className="mt-4 text-center">
            <Link to="/airports">
              <Button variant="link" className="text-blue-600">
                View All Airports
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AirportList;
