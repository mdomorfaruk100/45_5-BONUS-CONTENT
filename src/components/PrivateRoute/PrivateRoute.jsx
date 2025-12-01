import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { UserContext } from '../../context/UserProvider';

const PrivateRoute = ({children}) => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    if(user.isSignedIn){
        return children;
    }
    return (
        <Navigate to={'/login'} state={location.pathname} />
    );
};

export default PrivateRoute;