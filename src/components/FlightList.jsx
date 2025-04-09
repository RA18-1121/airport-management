
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiService } from "@/services/api";
import { Link } from 'react-router-dom';
import { Trash, Eye } from 'lucide-react';

const FlightList = ({ preview = false }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await apiService.getFlights();
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flights:", error);
        toast.error("Failed to load flights");
        setLoading(false);
      }
    };
    
    fetchFlights();
  }, []);

  const handleDeleteFlight = async (flightNumber) => {
    try {
      // In a real app with a backend, you would call an API endpoint
      // await apiService.deleteFlight(flightNumber);
      
      // For now, we'll just filter the flight out of the local state
      setFlights(flights.filter(flight => flight.flight_number !== flightNumber));
      toast.success(`Flight ${flightNumber} deleted`);
    } catch (error) {
      console.error("Error deleting flight:", error);
      toast.error("Failed to delete flight");
    }
  };

  const handleViewDetails = (flightNumber) => {
    toast.info(`Viewing details for flight ${flightNumber}`);
    // In a real app, this would navigate to a flight details page
  };

  const filteredFlights = flights.filter(flight => 
    flight.flight_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <CardHeader>
          <CardTitle className="text-2xl">Flight Information</CardTitle>
          <div className="mt-4">
            <Input
              placeholder="Search flights by number, source, destination, or airline..."
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
                            onClick={() => handleViewDetails(flight.flight_number)}
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
    </Card>
  );
};

export default FlightList;
