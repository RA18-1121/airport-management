
import React from 'react';
import { Link } from 'react-router-dom';
import AirportList from '@/components/AirportList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Airports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-[#2c3e50] text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Airport Management</h1>
          <p className="text-blue-100 mt-2">View and manage airport information</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          <Button className="bg-[#e67e22] hover:bg-orange-600">Add New Airport</Button>
        </div>

        <AirportList />
      </main>

      <footer className="bg-[#2c3e50] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Airport Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Airports;
