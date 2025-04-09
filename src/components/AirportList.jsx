
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiService } from "@/services/api";

const AirportList = ({ preview = false }) => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleViewDetails = (airportName) => {
    toast.info(`Viewing details for ${airportName}`);
    // In a real app, this would navigate to an airport details page
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
        <CardHeader>
          <CardTitle className="text-2xl">Airport Information</CardTitle>
          <div className="mt-4">
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(airport.airport_name)}
                        >
                          View Details
                        </Button>
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
            <Button variant="link" className="text-blue-600">
              View All Airports
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AirportList;
