import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
          placeholder="Search visualizers..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
