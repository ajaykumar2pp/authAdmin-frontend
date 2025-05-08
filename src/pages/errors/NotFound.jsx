import React from "react";
import { Link } from "react-router-dom";  

const NotFound = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg w-3/4 md:w-1/2">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"  
          className="bg-yellow-500 text-white py-2 px-6 rounded-full font-semibold text-lg transition hover:bg-yellow-400"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
