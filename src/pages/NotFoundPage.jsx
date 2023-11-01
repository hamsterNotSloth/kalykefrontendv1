import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-500 mt-4 block hover:underline">Go back to the home page</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
