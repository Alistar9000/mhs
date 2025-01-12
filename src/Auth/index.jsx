import { Navigate } from "react-router-dom";

const Auth = ({children}) => {
    const user = localStorage.getItem('User');
   
    return ( 
        
           user ? children : <Navigate to={'/login'} />
    );

    }
export default Auth;