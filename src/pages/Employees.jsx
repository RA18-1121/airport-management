// src/pages/Employees.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Trash, Eye, Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Added Description
  DialogFooter,
  DialogClose,
  DialogTrigger, // Added Trigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select components
import { apiService } from "@/services/api"; // Import apiService

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false); // State for Add dialog
  const [viewDialogOpen, setViewDialogOpen] = useState(false); // State for View dialog
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee details
  const [newEmployee, setNewEmployee] = useState({
    e_id: '',
    name: '',
    address: '', // Added address field
    title: '',
    destination: 'Domestic',
    salary: '',
    // Removed age, will be calculated on backend/frontend
    dob: '',
    airport_name: ''
  });

  // Fetch initial data
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await apiService.getEmployees();
        setEmployees(data);
      } catch (error) {
        toast.error("Failed to load employees");
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const handleSelectChange = (name, value) => {
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Updated handleAddEmployee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    // Add validation as needed
    if (!newEmployee.e_id || !newEmployee.name || !newEmployee.title || !newEmployee.salary || !newEmployee.dob || !newEmployee.airport_name) {
        toast.error("Please fill in all required fields.");
        return;
    }

    const result = await apiService.addEmployee(newEmployee);
    if (result.success) {
      // The API response might include the calculated age
      setEmployees(currentEmployees => [...currentEmployees, result.data]);
      toast.success(`Added employee: ${newEmployee.name}`);
      setAddDialogOpen(false); // Close add dialog
      // Reset form
      setNewEmployee({
        e_id: '', name: '', address: '', title: '', destination: 'Domestic', salary: '', dob: '', airport_name: ''
      });
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    // Keep using local filter for now
    try {
      // await apiService.deleteEmployee(employeeId); // Future implementation
      setEmployees(employees.filter(employee => employee.e_id !== employeeId));
      toast.success(`Employee ${employeeId} deleted (locally)`);
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }
  };

  // Updated handleViewDetails
  const handleViewDetails = (employeeId) => {
    const employee = employees.find(e => e.e_id === employeeId);
     if (employee) {
      setSelectedEmployee(employee);
      setViewDialogOpen(true); // Open view dialog
    } else {
        toast.error("Could not find employee details.");
    }
  };

  const filteredEmployees = employees.filter(employee =>
    (employee.e_id && employee.e_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.title && employee.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (employee.airport_name && employee.airport_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
          {/* Add New Employee Button Trigger */}
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
               <Button className="bg-[#e67e22] hover:bg-orange-600 flex items-center gap-2">
                <Plus size={16} /> Add New Employee
               </Button>
            </DialogTrigger>
             {/* Add New Employee Dialog Content */}
             <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>Enter the details for the new employee.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee}>
                <div className="grid gap-4 py-4">
                  {/* Employee ID */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="e_id" className="text-right">Employee ID</Label>
                    <Input id="e_id" name="e_id" value={newEmployee.e_id} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Name */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" value={newEmployee.name} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Address */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">Address</Label>
                    <Input id="address" name="address" value={newEmployee.address} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  {/* Title */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" name="title" value={newEmployee.title} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Destination */}
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="destination" className="text-right">Destination</Label>
                     <Select value={newEmployee.destination} onValueChange={(value) => handleSelectChange('destination', value)}>
                       <SelectTrigger className="col-span-3"><SelectValue placeholder="Select destination type" /></SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Domestic">Domestic</SelectItem>
                         <SelectItem value="International">International</SelectItem>
                       </SelectContent>
                     </Select>
                  </div>
                  {/* Salary */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="salary" className="text-right">Salary</Label>
                    <Input id="salary" name="salary" value={newEmployee.salary} onChange={handleInputChange} className="col-span-3" placeholder="e.g., $58,000 or 58000" required />
                  </div>
                  {/* Date of Birth */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dob" className="text-right">Date of Birth</Label>
                    <Input id="dob" name="dob" type="date" value={newEmployee.dob} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                  {/* Airport */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="airport_name" className="text-right">Airport</Label>
                    <Input id="airport_name" name="airport_name" value={newEmployee.airport_name} onChange={handleInputChange} className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Employee</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-grow">
              <CardTitle className="text-2xl mb-2 md:mb-0">Employee Records</CardTitle>
            </div>
            <div className="w-full md:w-auto md:max-w-sm">
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
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
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(employee.e_id)} // Use updated handler
                              >
                                <Eye className="mr-1 h-4 w-4" /> View
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteEmployee(employee.e_id)}
                              >
                                <Trash className="mr-1 h-4 w-4" /> Delete
                              </Button>
                            </div>
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

       {/* View Details Dialog */}
       <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">ID:</Label>
                <span className="col-span-3">{selectedEmployee.e_id}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Name:</Label>
                <span className="col-span-3">{selectedEmployee.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Address:</Label>
                <span className="col-span-3">{selectedEmployee.address}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Title:</Label>
                <span className="col-span-3">{selectedEmployee.title}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Destination:</Label>
                <span className="col-span-3">{selectedEmployee.destination}</span>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Salary:</Label>
                <span className="col-span-3">{selectedEmployee.salary}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Age:</Label>
                <span className="col-span-3">{selectedEmployee.age}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">DOB:</Label>
                <span className="col-span-3">{selectedEmployee.dob}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Airport:</Label>
                <span className="col-span-3">{selectedEmployee.airport_name}</span>
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


      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Employees;