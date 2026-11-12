import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.js";
import { useEffect } from "react";
import { FirstDashboardSkeleton } from "./ui/skeleton/FِirstDashboardSkeleton.jsx";

export default function ProtectedRoute({ children }) {
  const { user, fetchUser,isFetched} = useAuthStore();
  
  useEffect(() => {
    const check = () => {
       if(!isFetched) 
        {
         setTimeout( async () => {
           await fetchUser(); 
          
         }, 1000);
        } 
    };
    check();
  }, []);
  
  if(!isFetched)  return <FirstDashboardSkeleton />

  if (!user){

      return <Navigate to="/" replace />;
  } 


  return children;
}
