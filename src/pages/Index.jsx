
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FlightList from '@/components/FlightList';
import AirportList from '@/components/AirportList';
import AirlineList from '@/components/AirlineList';
import { toast } from "sonner";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoaded(true);
      toast.success("Welcome to Airport Management System");
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Airport Management System</h1>
          <p className="text-blue-100 mt-2">Manage airports, airlines, flights, employees, and passengers</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Airports</CardTitle>
              <CardDescription>Manage airport information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/airports">
                <Button className="w-full bg-[#3498db] hover:bg-blue-600">View Airports</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Airlines</CardTitle>
              <CardDescription>Manage airline information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/airlines">
                <Button className="w-full bg-[#3498db] hover:bg-blue-600">View Airlines</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Flights</CardTitle>
              <CardDescription>Track flight information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/flights">
                <Button className="w-full bg-[#3498db] hover:bg-blue-600">View Flights</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Employees</CardTitle>
              <CardDescription>Manage employee records</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/employees">
                <Button className="w-full bg-[#3498db] hover:bg-blue-600">View Employees</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Passengers</CardTitle>
              <CardDescription>View passenger information</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/passengers">
                <Button className="w-full bg-[#3498db] hover:bg-blue-600">View Passengers</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="flights" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="flights">Recent Flights</TabsTrigger>
            <TabsTrigger value="airports">Airports</TabsTrigger>
            <TabsTrigger value="airlines">Airlines</TabsTrigger>
          </TabsList>
          <TabsContent value="flights" className="bg-white p-4 rounded-lg shadow">
            {isLoaded ? <FlightList preview={true} /> : 
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            }
          </TabsContent>
          <TabsContent value="airports" className="bg-white p-4 rounded-lg shadow">
            {isLoaded ? <AirportList preview={true} /> : 
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            }
          </TabsContent>
          <TabsContent value="airlines" className="bg-white p-4 rounded-lg shadow">
            {isLoaded ? <AirlineList preview={true} /> : 
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            }
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
