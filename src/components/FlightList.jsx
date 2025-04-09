// src/components/FlightList.jsx
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


const FlightList = ({ preview = false, flights: initialFlights, setFlights }) => { // Accept flights and setter
  const [loading, setLoading] = useState(!initialFlights);
  const [searchTerm, setSearchTerm] = useState('');

   // State for View Details Dialog
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    // Only fetch if initialFlights is not provided
    if (!initialFlights) {
        const fetchFlights = async () => {
        try {
          const data = await apiService.getFlights();
          if (setFlights) setFlights(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching flights:", error);
          toast.error("Failed to load flights");
          setLoading(false);
        }
      };
      fetchFlights();
    } else {
        setLoading(false); // Data provided
    }
  }, [initialFlights, setFlights]);

  const handleDeleteFlight = async (flightNumber) => {
    // Keep using local filter for now
    try {
      // await apiService.deleteFlight(flightNumber); // Future implementation
      setFlights(currentFlights => currentFlights.filter(flight => flight.flight_number !== flightNumber));
      toast.success(`Flight ${flightNumber} deleted (locally)`);
    } catch (error) {
      console.error("Error deleting flight:", error);
      toast.error("Failed to delete flight");
    }
  };

  // Updated handleViewDetails
  const handleViewDetails = (flightNumber) => {
    const flight = (initialFlights || []).find(f => f.flight_number === flightNumber);
     if (flight) {
      setSelectedFlight(flight);
      setIsDetailDialogOpen(true);
    } else {
        toast.error("Could not find flight details.");
    }
  };

  const currentFlights = initialFlights || [];

  const filteredFlights = currentFlights.filter(flight =>
    flight.flight_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (flight.source && flight.source.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (flight.destination && flight.destination.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (flight.airline_name && flight.airline_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayedFlights = preview ? filteredFlights.slice(0, 3) : filteredFlights;

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
              <CardTitle className="text-2xl mb-2 md:mb-0">Flight Information</CardTitle>
          </div>
          <div className="w-full md:w-auto md:max-w-sm">
            <Input
              placeholder="Search flights..."
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
                <TableHead>Flight #</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Airline</TableHead>
                {!preview && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedFlights.length > 0 ? (
                displayedFlights.map((flight) => (
                  <TableRow key={flight.flight_number} className="hover:bg-blue-50">
                    <TableCell className="font-medium">{flight.flight_number}</TableCell>
                    <TableCell>{flight.source}</TableCell>
                    <TableCell>{flight.destination}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        flight.status === 'On Time' ? 'bg-green-100 text-green-800' :
                        flight.status === 'Delayed' ? 'bg-red-100 text-red-800' :
                        flight.status === 'Boarding' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {flight.status}
                      </span>
                    </TableCell>
                    <TableCell>{flight.d_time}</TableCell>
                    <TableCell>{flight.airline_name}</TableCell>
                    {!preview && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(flight.flight_number)} // Use updated handler
                          >
                            <Eye className="mr-1 h-4 w-4" /> View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteFlight(flight.flight_number)}
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
                  <TableCell colSpan={preview ? 6 : 7} className="text-center py-4">
                    No flights found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {preview && (
          <div className="mt-4 text-center">
            <Link to="/flights">
              <Button variant="link" className="text-blue-600">
                View All Flights
              </Button>
            </Link>
          </div>
        )}
      </CardContent>

       {/* View Details Dialog */}
       <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[550px]"> {/* Wider dialog */}
          <DialogHeader>
            <DialogTitle>Flight Details</DialogTitle>
          </DialogHeader>
          {selectedFlight && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Flight #:</Label>
                <span className="col-span-3">{selectedFlight.flight_number}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Source:</Label>
                <span className="col-span-3">{selectedFlight.source}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Destination:</Label>
                <span className="col-span-3">{selectedFlight.destination}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Status:</Label>
                <span className="col-span-3">{selectedFlight.status}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Departure:</Label>
                <span className="col-span-3">{selectedFlight.d_time}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Arrival:</Label>
                <span className="col-span-3">{selectedFlight.a_time}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Airline:</Label>
                <span className="col-span-3">{selectedFlight.airline_name} ({selectedFlight.airline_id})</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Connected:</Label>
                <span className="col-span-3">{selectedFlight.connected}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Duration:</Label>
                <span className="col-span-3">{selectedFlight.duration}</span>
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

export default FlightList;