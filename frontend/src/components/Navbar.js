import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16">
          {/* Logo and Name */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Visualizer Vault Logo" 
                className="h-10 w-10"
              />
              <span className="ml-2 text-xl font-bold text-orange-500">Visualizer Vault</span>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-orange-500 px-5 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-orange-500 px-5 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/contribute" 
              className="text-gray-700 hover:text-orange-500 px-5 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Contribute
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-4 pt-3 pb-4 space-y-3">
          <Link to="/" className="text-gray-700 hover:bg-orange-50 block px-5 py-4 rounded-lg text-xl font-semibold">Home</Link>
          <Link to="/about" className="text-gray-700 hover:bg-orange-50 block px-5 py-4 rounded-lg text-xl font-semibold">About</Link>
          <Link to="/contribute" className="text-gray-700 hover:bg-orange-50 block px-5 py-4 rounded-lg text-xl font-semibold">Contribute</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
