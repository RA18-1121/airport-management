
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { apiService } from "@/services/api";

const AirlineList = ({ preview = false }) => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const data = await apiService.getAirlines();
        setAirlines(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching airlines:", error);
        toast.error("Failed to load airlines");
        setLoading(false);
      }
    };
    
    fetchAirlines();
  }, []);

  const handleViewDetails = (airlineId) => {
    toast.info(`Viewing details for airline ${airlineId}`);
    // In a real app, this would navigate to an airline details page
  };

  const filteredAirlines = airlines.filter(airline => 
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
        <CardHeader>
          <CardTitle className="text-2xl">Airline Information</CardTitle>
          <div className="mt-4">
            <Input
              placeholder="Search airlines by ID, name, or airport..."
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(airline.airline_id)}
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
                    No airlines found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {preview && (
          <div className="mt-4 text-center">
            <Button variant="link" className="text-blue-600">
              View All Airlines
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AirlineList;
