import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = ({ message = 'Loading...', className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-12 ${className}`}>
      <FaSpinner className="animate-spin text-orange-500 text-4xl" />
      <span className="ml-3 text-gray-600">{message}</span>
    </div>
  );
};

export default Loader;
