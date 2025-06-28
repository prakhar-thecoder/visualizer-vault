import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div>
          <h1 className="text-9xl font-bold text-orange-500">404</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Page not found
          </h2>
          <p className="mt-2 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/"
            className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaHome className="h-5 w-5" />
            </span>
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group relative w-full flex justify-center py-3 px-6 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaArrowLeft className="h-5 w-5" />
            </span>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
