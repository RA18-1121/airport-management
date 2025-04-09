
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const FlightList = ({ preview = false }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - In a real app, this would come from an API
  const mockFlights = [
    { 
      flight_number: 'FL123', 
      source: 'New York', 
      destination: 'Los Angeles',
      status: 'On Time',
      d_time: '10:00 AM',
      a_time: '1:00 PM',
      connected: 'No',
      duration: '3h',
      airline_id: 'AA',
      airline_name: 'American Airlines'
    },
    { 
      flight_number: 'FL456', 
      source: 'Chicago', 
      destination: 'Miami',
      status: 'Delayed',
      d_time: '12:30 PM',
      a_time: '4:15 PM',
      connected: 'No',
      duration: '3h 45m',
      airline_id: 'DL',
      airline_name: 'Delta Airlines'
    },
    { 
      flight_number: 'FL789', 
      source: 'Dallas', 
      destination: 'Seattle',
      status: 'Boarding',
      d_time: '2:45 PM',
      a_time: '5:30 PM',
      connected: 'Yes',
      duration: '4h 15m',
      airline_id: 'UA',
      airline_name: 'United Airlines'
    },
    { 
      flight_number: 'FL101', 
      source: 'San Francisco', 
      destination: 'Boston',
      status: 'Scheduled',
      d_time: '7:15 AM',
      a_time: '3:45 PM',
      connected: 'Yes',
      duration: '5h 30m',
      airline_id: 'SW',
      airline_name: 'Southwest Airlines'
    },
    { 
      flight_number: 'FL202', 
      source: 'Atlanta', 
      destination: 'Denver',
      status: 'On Time',
      d_time: '9:30 AM',
      a_time: '11:00 AM',
      connected: 'No',
      duration: '2h 30m',
      airline_id: 'JB',
      airline_name: 'JetBlue Airways'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFlights(mockFlights);
      setLoading(false);
    }, 800);
  }, []);

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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(flight.flight_number)}
                        >
                          View Details
                        </Button>
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
            <Button variant="link" className="text-blue-600">
              View All Flights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlightList;
