
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - In a real app, this would come from an API
  const mockEmployees = [
    { 
      e_id: 'E001', 
      name: 'John Smith', 
      address: '123 Main St, Chicago, IL',
      title: 'Flight Attendant',
      destination: 'International',
      salary: '$58,000',
      age: 32,
      dob: '1992-05-15',
      airport_name: "O'Hare International Airport"
    },
    { 
      e_id: 'E002', 
      name: 'Sarah Johnson', 
      address: '456 Park Ave, New York, NY',
      title: 'Pilot',
      destination: 'Domestic',
      salary: '$120,000',
      age: 41,
      dob: '1983-11-22',
      airport_name: 'John F. Kennedy International Airport'
    },
    { 
      e_id: 'E003', 
      name: 'Michael Rodriguez', 
      address: '789 Ocean Dr, Miami, FL',
      title: 'Ground Crew',
      destination: 'Domestic',
      salary: '$48,000',
      age: 27,
      dob: '1997-03-30',
      airport_name: 'Miami International Airport'
    },
    { 
      e_id: 'E004', 
      name: 'Emily Chen', 
      address: '321 Tech Way, San Francisco, CA',
      title: 'Air Traffic Controller',
      destination: 'International',
      salary: '$92,000',
      age: 35,
      dob: '1989-08-12',
      airport_name: 'San Francisco International Airport'
    },
    { 
      e_id: 'E005', 
      name: 'David Williams', 
      address: '567 Southern Blvd, Atlanta, GA',
      title: 'Baggage Handler',
      destination: 'Domestic',
      salary: '$42,000',
      age: 29,
      dob: '1995-02-28',
      airport_name: 'Hartsfield-Jackson Atlanta International Airport'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 800);
  }, []);

  const handleViewDetails = (employeeId) => {
    toast.info(`Viewing details for employee ${employeeId}`);
    // In a real app, this would navigate to an employee details page
  };

  const filteredEmployees = employees.filter(employee => 
    employee.e_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.airport_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-blue-100 mt-2">View and manage employee information</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          <Button className="bg-[#e67e22] hover:bg-orange-600">Add New Employee</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Employee Records</CardTitle>
            <div className="mt-4">
              <Input
                placeholder="Search employees by ID, name, title, or airport..."
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
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Airport</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.e_id} className="hover:bg-blue-50">
                          <TableCell className="font-medium">{employee.e_id}</TableCell>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.title}</TableCell>
                          <TableCell>{employee.age}</TableCell>
                          <TableCell>{employee.salary}</TableCell>
                          <TableCell>{employee.airport_name}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(employee.e_id)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No employees found matching your search
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

export default Employees;
