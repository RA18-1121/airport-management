
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'bg-[#3498db] text-white' : 'text-white hover:bg-blue-800';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#2c3e50] py-2 px-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="font-bold text-xl text-white">Airport MS</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          <Link to="/" className={`px-3 py-2 rounded ${isActive('/')}`}>Dashboard</Link>
          <Link to="/airports" className={`px-3 py-2 rounded ${isActive('/airports')}`}>Airports</Link>
          <Link to="/airlines" className={`px-3 py-2 rounded ${isActive('/airlines')}`}>Airlines</Link>
          <Link to="/flights" className={`px-3 py-2 rounded ${isActive('/flights')}`}>Flights</Link>
          <Link to="/employees" className={`px-3 py-2 rounded ${isActive('/employees')}`}>Employees</Link>
          <Link to="/passengers" className={`px-3 py-2 rounded ${isActive('/passengers')}`}>Passengers</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 px-2 pb-3 pt-2 space-y-1">
          <Link to="/" 
            className={`block px-3 py-2 rounded-md ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link to="/airports" 
            className={`block px-3 py-2 rounded-md ${isActive('/airports')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Airports
          </Link>
          <Link to="/airlines" 
            className={`block px-3 py-2 rounded-md ${isActive('/airlines')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Airlines
          </Link>
          <Link to="/flights" 
            className={`block px-3 py-2 rounded-md ${isActive('/flights')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Flights
          </Link>
          <Link to="/employees" 
            className={`block px-3 py-2 rounded-md ${isActive('/employees')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Employees
          </Link>
          <Link to="/passengers" 
            className={`block px-3 py-2 rounded-md ${isActive('/passengers')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Passengers
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
