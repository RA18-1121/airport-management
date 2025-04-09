
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Passengers = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - In a real app, this would come from an API
  const mockPassengers = [
    { 
      passport_number: 'P123456', 
      name: 'Robert Brown', 
      address: '789 Pine St, Boston, MA',
      sex: 'Male',
      dob: '1985-07-22',
      age: 39,
      flight_number: 'FL123',
      ticket_number: 'T78901'
    },
    { 
      passport_number: 'P234567', 
      name: 'Jennifer Lee', 
      address: '456 Oak Ave, Seattle, WA',
      sex: 'Female',
      dob: '1990-04-15',
      age: 34,
      flight_number: 'FL456',
      ticket_number: 'T78902'
    },
    { 
      passport_number: 'P345678', 
      name: 'Thomas Wilson', 
      address: '123 Maple Dr, Chicago, IL',
      sex: 'Male',
      dob: '1978-11-30',
      age: 46,
      flight_number: 'FL789',
      ticket_number: 'T78903'
    },
    { 
      passport_number: 'P456789', 
      name: 'Maria Garcia', 
      address: '567 Cedar Ln, Miami, FL',
      sex: 'Female',
      dob: '1995-03-18',
      age: 29,
      flight_number: 'FL101',
      ticket_number: 'T78904'
    },
    { 
      passport_number: 'P567890', 
      name: 'Daniel Kim', 
      address: '890 Birch Rd, Los Angeles, CA',
      sex: 'Male',
      dob: '1988-09-05',
      age: 36,
      flight_number: 'FL202',
      ticket_number: 'T78905'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPassengers(mockPassengers);
      setLoading(false);
    }, 800);
  }, []);

  const handleViewDetails = (passportNumber) => {
    toast.info(`Viewing details for passenger with passport ${passportNumber}`);
    // In a real app, this would navigate to a passenger details page
  };

  const filteredPassengers = passengers.filter(passenger => 
    passenger.passport_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.flight_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    passenger.ticket_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Passenger Management</h1>
          <p className="text-blue-100 mt-2">View and manage passenger information</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          <Button className="bg-[#e67e22] hover:bg-orange-600">Add New Passenger</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Passenger Records</CardTitle>
            <div className="mt-4">
              <Input
                placeholder="Search passengers by passport, name, flight, or ticket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
          </CardHeader>
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
                      <TableHead>Passport #</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Flight #</TableHead>
                      <TableHead>Ticket #</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPassengers.length > 0 ? (
                      filteredPassengers.map((passenger) => (
                        <TableRow key={passenger.passport_number} className="hover:bg-blue-50">
                          <TableCell className="font-medium">{passenger.passport_number}</TableCell>
                          <TableCell>{passenger.name}</TableCell>
                          <TableCell>{passenger.age}</TableCell>
                          <TableCell>{passenger.flight_number}</TableCell>
                          <TableCell>{passenger.ticket_number}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(passenger.passport_number)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No passengers found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Passengers;
