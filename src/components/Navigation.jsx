
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-[#3498db] text-white' : 'text-white hover:bg-blue-800';
  };

  return (
    <nav className="bg-[#2c3e50] py-2 px-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="font-bold text-xl text-white">Airport MS</Link>
        
        <div className="hidden md:flex space-x-1">
          <Link to="/" className={`px-3 py-2 rounded ${isActive('/')}`}>Dashboard</Link>
          <Link to="/airports" className={`px-3 py-2 rounded ${isActive('/airports')}`}>Airports</Link>
          <Link to="/airlines" className={`px-3 py-2 rounded ${isActive('/airlines')}`}>Airlines</Link>
          <Link to="/flights" className={`px-3 py-2 rounded ${isActive('/flights')}`}>Flights</Link>
          <Link to="/employees" className={`px-3 py-2 rounded ${isActive('/employees')}`}>Employees</Link>
          <Link to="/passengers" className={`px-3 py-2 rounded ${isActive('/passengers')}`}>Passengers</Link>
        </div>
        
        <button className="md:hidden flex items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
