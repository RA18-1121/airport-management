// src/components/AirportList.jsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiService } from "@/services/api";
import { Link } from 'react-router-dom';
import { Trash, Eye } from 'lucide-react'; // Removed Plus icon import
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose, // Import DialogClose
  // Removed DialogDescription, DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AirportList = ({ preview = false, airports: initialAirports, setAirports }) => { // Accept airports and setter as props
  // Removed local airports state, use props instead
  // const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(!initialAirports); // Set loading based on initial data
  const [searchTerm, setSearchTerm] = useState('');
  // Removed add dialog state
  // const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // const [newAirport, setNewAirport] = useState({ ... });

  // State for View Details Dialog
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    // Only fetch if initialAirports is not provided (e.g., not on Airports page)
    if (!initialAirports) {
      const fetchAirports = async () => {
        try {
          const data = await apiService.getAirports();
          // If used independently, update local state (though it's better to lift state up)
          // For now, assuming it's mainly used with props on Airports page or preview on Index
          if (setAirports) setAirports(data); // Update parent state if setter is provided
          setLoading(false);
        } catch (error) {
          console.error("Error fetching airports:", error);
          toast.error("Failed to load airports");
          setLoading(false);
        }
      };
      fetchAirports();
    }
  }, [initialAirports, setAirports]); // Add dependencies

  const handleDeleteAirport = async (airportName) => {
    // Keep using local filter for now as delete API is placeholder
    try {
      // await apiService.deleteAirport(airportName); // Future implementation
      setAirports(currentAirports => currentAirports.filter(airport => airport.airport_name !== airportName));
      toast.success(`Airport ${airportName} deleted (locally)`);
    } catch (error) {
      console.error("Error deleting airport:", error);
      toast.error("Failed to delete airport");
    }
  };

  // Updated handleViewDetails
  const handleViewDetails = (airportName) => {
    const airport = (initialAirports || []).find(a => a.airport_name === airportName);
    if (airport) {
      setSelectedAirport(airport);
      setIsDetailDialogOpen(true);
    } else {
        toast.error("Could not find airport details.");
    }
  };

  // Removed handleAddAirport and handleInputChange

  const currentAirports = initialAirports || []; // Use passed airports or empty array

  const filteredAirports = currentAirports.filter(airport =>
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
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Removed Add New Airport button/dialog trigger */}
          <div className="flex-grow">
              <CardTitle className="text-2xl mb-2 md:mb-0">Airport Information</CardTitle>
          </div>
          <div className="w-full md:w-auto md:max-w-sm">
            <Input
              placeholder="Search airports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </CardHeader>
      )}
      {/* Removed Add New Airport Dialog Content */}
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
                  <TableRow key={airport.airport_name || index} className="hover:bg-blue-50"> {/* Use name as key */}
                    <TableCell className="font-medium">{airport.airport_name}</TableCell>
                    <TableCell>{airport.city}</TableCell>
                    <TableCell>{airport.state}</TableCell>
                    {!preview && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(airport.airport_name)} // Use updated handler
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

      {/* View Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Airport Details</DialogTitle>
          </DialogHeader>
          {selectedAirport && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Name:</Label>
                <span className="col-span-3">{selectedAirport.airport_name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">City:</Label>
                <span className="col-span-3">{selectedAirport.city}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">State:</Label>
                <span className="col-span-3">{selectedAirport.state}</span>
              </div>
              {/* Add other relevant details if needed */}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Card>
  );
};

export default AirportList;