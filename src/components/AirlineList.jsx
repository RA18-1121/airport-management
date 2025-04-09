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

const AirlineList = ({ preview = false, airlines: initialAirlines, setAirlines }) => {
  // Add local state for data fetched internally
  const [localAirlines, setLocalAirlines] = useState([]);
  // Set initial loading state correctly
  const [loading, setLoading] = useState(!initialAirlines && localAirlines.length === 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

   useEffect(() => {
    // Only fetch if initialAirlines prop is not provided
    if (!initialAirlines) {
      setLoading(true);
      const fetchAirlinesInternal = async () => {
        try {
          const data = await apiService.getAirlines();
          if (setAirlines) {
            console.warn("AirlineList fetched data but setAirlines prop was provided.");
            setAirlines(data);
          } else {
            setLocalAirlines(data);
          }
        } catch (error) {
          console.error("Error fetching airlines in AirlineList:", error);
          // toast.error("Failed to load airlines");
          setLocalAirlines([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAirlinesInternal();
    } else {
      setLoading(false);
      setLocalAirlines([]);
    }
  }, [initialAirlines]); // Intentionally excluding setAirlines

  const handleDeleteAirline = async (airlineId) => {
    const isUsingProps = !!initialAirlines;
    const currentData = isUsingProps ? initialAirlines : localAirlines;
    const updateState = isUsingProps ? setAirlines : setLocalAirlines;

    if (!updateState) return;

    updateState(currentData.filter(airline => airline.airline_id !== airlineId));
    toast.success(`Airline ${airlineId} removed from list.`);

    try {
      const result = await apiService.deleteAirline(airlineId);
      if (!result.success) {
        toast.error(`Failed to delete airline ${airlineId} on server.`);
        updateState(currentData);
      }
    } catch (error) {
      console.error("Error deleting airline:", error);
      toast.error("Failed to delete airline on server.");
      updateState(currentData);
    }
  };

  const handleViewDetails = (airlineId) => {
    const currentData = initialAirlines || localAirlines;
    const airline = currentData.find(a => a.airline_id === airlineId);
    if (airline) {
      setSelectedAirline(airline);
      setIsDetailDialogOpen(true);
    } else {
        toast.error("Could not find airline details.");
    }
  };

  const currentAirlines = initialAirlines || localAirlines;

  const filteredAirlines = Array.isArray(currentAirlines) ? currentAirlines.filter(airline =>
    airline.airline_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airline.airline_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airline.airport_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const displayedAirlines = preview ? filteredAirlines.slice(0, 3) : filteredAirlines;

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
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
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
                              onClick={() => handleViewDetails(airline.airline_id)}
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
                      No airlines found {searchTerm ? 'matching your search' : ''}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {preview && !loading && displayedAirlines.length > 0 && (
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
              {/* Dialog content remains the same */}
              <div className="grid grid-cols-4 items-center gap-4"> <Label className="text-right font-semibold">ID:</Label> <span className="col-span-3">{selectedAirline.airline_id}</span> </div>
              <div className="grid grid-cols-4 items-center gap-4"> <Label className="text-right font-semibold">Name:</Label> <span className="col-span-3">{selectedAirline.airline_name}</span> </div>
              <div className="grid grid-cols-4 items-center gap-4"> <Label className="text-right font-semibold">Hub Airport:</Label> <span className="col-span-3">{selectedAirline.airport_name}</span> </div>
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