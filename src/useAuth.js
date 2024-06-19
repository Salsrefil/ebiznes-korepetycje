import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Adjust the path as necessary

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;