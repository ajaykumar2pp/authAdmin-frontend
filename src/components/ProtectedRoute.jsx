// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../api/authAPI";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await getUser();
        if (res?.data?.user) {
          setAuth(true);
        } else {
          throw new Error("No user");
        }
      } catch (err) {
        setAuth(false);
        toast.error("Unauthorized. Please log in.");
      }
    };
    verify();
  }, []);

  if (auth === null) return <div className="text-center mt-10">Loading...</div>;
  if (!auth) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
