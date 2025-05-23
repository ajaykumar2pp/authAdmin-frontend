import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../api/authAPI";

const PublicRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getUser(); 
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
         toast.error("Unauthorized. Please log in.");
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user ? <Navigate to="/dashboard" /> : children;
// };

// export default PublicRoute;
