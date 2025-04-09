// src/components/AirlineList.jsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiService } from "@/services/api";
import { Link } from 'react-router-dom';
import { Trash, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AirlineList = ({ preview = false, airlines: initialAirlines, setAirlines }) => { // Accept airlines and setter as props
  const [loading, setLoading] = useState(!initialAirlines);
  const [searchTerm, setSearchTerm] = useState('');

  // State for View Details Dialog
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

   useEffect(() => {
    // Only fetch if initialAirlines is not provided
    if (!initialAirlines) {
      const fetchAirlines = async () => {
        try {
          const data = await apiService.getAirlines();
          if (setAirlines) setAirlines(data); // Update parent state if setter is provided
          setLoading(false);
        } catch (error) {
          console.error("Error fetching airlines:", error);
          toast.error("Failed to load airlines");
          setLoading(false);
        }
      };
      fetchAirlines();
    } else {
       setLoading(false); // Data already provided
    }
  }, [initialAirlines, setAirlines]); // Add dependencies


  const handleDeleteAirline = async (airlineId) => {
    // Keep using local filter for now
    try {
      // await apiService.deleteAirline(airlineId); // Future implementation
      setAirlines(currentAirlines => currentAirlines.filter(airline => airline.airline_id !== airlineId));
      toast.success(`Airline ${airlineId} deleted (locally)`);
    } catch (error) {
      console.error("Error deleting airline:", error);
      toast.error("Failed to delete airline");
    }
  };

  // Updated handleViewDetails
  const handleViewDetails = (airlineId) => {
    const airline = (initialAirlines || []).find(a => a.airline_id === airlineId);
    if (airline) {
      setSelectedAirline(airline);
      setIsDetailDialogOpen(true);
    } else {
        toast.error("Could not find airline details.");
    }
  };

  const currentAirlines = initialAirlines || [];

  const filteredAirlines = currentAirlines.filter(airline =>
    airline.airline_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airline.airline_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airline.airport_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedAirlines = preview ? filteredAirlines.slice(0, 3) : filteredAirlines;

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
           <div className="flex-grow">
              <CardTitle className="text-2xl mb-2 md:mb-0">Airline Information</CardTitle>
          </div>
          <div className="w-full md:w-auto md:max-w-sm">
            <Input
              placeholder="Search airlines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full"
            />
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead>Airline ID</TableHead>
                <TableHead>Airline Name</TableHead>
                <TableHead>Hub Airport</TableHead>
                {!preview && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedAirlines.length > 0 ? (
                displayedAirlines.map((airline) => (
                  <TableRow key={airline.airline_id} className="hover:bg-blue-50">
                    <TableCell className="font-medium">{airline.airline_id}</TableCell>
                    <TableCell>{airline.airline_name}</TableCell>
                    <TableCell>{airline.airport_name}</TableCell>
                    {!preview && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(airline.airline_id)} // Use updated handler
                          >
                            <Eye className="mr-1 h-4 w-4" /> View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAirline(airline.airline_id)}
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
                    No airlines found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {preview && (
          <div className="mt-4 text-center">
            <Link to="/airlines">
              <Button variant="link" className="text-blue-600">
                View All Airlines
              </Button>
            </Link>
          </div>
        )}
      </CardContent>

      {/* View Details Dialog */}
       <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Airline Details</DialogTitle>
          </DialogHeader>
          {selectedAirline && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">ID:</Label>
                <span className="col-span-3">{selectedAirline.airline_id}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Name:</Label>
                <span className="col-span-3">{selectedAirline.airline_name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Hub Airport:</Label>
                <span className="col-span-3">{selectedAirline.airport_name}</span>
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

    </Card>
  );
};

export default AirlineList;