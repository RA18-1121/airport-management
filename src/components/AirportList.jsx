// src/components/AirportList.jsx
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

const AirportList = ({ preview = false, airports: initialAirports, setAirports }) => {
  // Add local state for data fetched internally
  const [localAirports, setLocalAirports] = useState([]);
  // Set initial loading state correctly
  const [loading, setLoading] = useState(!initialAirports && localAirports.length === 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    // Only fetch if initialAirports prop is not provided
    if (!initialAirports) {
      setLoading(true);
      const fetchAirportsInternal = async () => {
        try {
          const data = await apiService.getAirports();
          if (setAirports) {
            console.warn("AirportList fetched data but setAirports prop was provided.");
            setAirports(data);
          } else {
            setLocalAirports(data);
          }
        } catch (error) {
          console.error("Error fetching airports in AirportList:", error);
          // toast.error("Failed to load airports");
          setLocalAirports([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAirportsInternal();
    } else {
      setLoading(false);
      setLocalAirports([]);
    }
  }, [initialAirports]); // Intentionally excluding setAirports

  const handleDeleteAirport = async (airportName) => {
    const isUsingProps = !!initialAirports;
    const currentData = isUsingProps ? initialAirports : localAirports;
    const updateState = isUsingProps ? setAirports : setLocalAirports;

    if (!updateState) return;

    updateState(currentData.filter(airport => airport.airport_name !== airportName));
    toast.success(`Airport ${airportName} removed from list.`);

    try {
      const result = await apiService.deleteAirport(airportName);
      if (!result.success) {
        toast.error(`Failed to delete airport ${airportName} on server.`);
        updateState(currentData);
      }
    } catch (error) {
      console.error("Error deleting airport:", error);
      toast.error("Failed to delete airport on server.");
      updateState(currentData);
    }
  };

  const handleViewDetails = (airportName) => {
    const currentData = initialAirports || localAirports;
    const airport = currentData.find(a => a.airport_name === airportName);
    if (airport) {
      setSelectedAirport(airport);
      setIsDetailDialogOpen(true);
    } else {
      toast.error("Could not find airport details.");
    }
  };

  const currentAirports = initialAirports || localAirports;

  const filteredAirports = Array.isArray(currentAirports) ? currentAirports.filter(airport =>
    airport.airport_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.state?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const displayedAirports = preview ? filteredAirports.slice(0, 3) : filteredAirports;

  return (
    <Card>
      {!preview && (
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
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
                    <TableRow key={airport.airport_name || index} className="hover:bg-blue-50">
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
                      No airports found {searchTerm ? 'matching your search' : ''}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {preview && !loading && displayedAirports.length > 0 && (
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
               {/* Dialog content remains the same */}
              <div className="grid grid-cols-4 items-center gap-4"> <Label className="text-right font-semibold">Name:</Label> <span className="col-span-3">{selectedAirport.airport_name}</span> </div>
              <div className="grid grid-cols-4 items-center gap-4"> <Label className="text-right font-semibold">City:</Label> <span className="col-span-3">{selectedAirport.city}</span> </div>
              <div className="grid grid-cols-4 items-center gap-4"> <Label className="text-right font-semibold">State:</Label> <span className="col-span-3">{selectedAirport.state}</span> </div>
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