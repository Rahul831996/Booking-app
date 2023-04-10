import React, { Fragment, useContext } from 'react'
import { Navigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';




const ProtectedRoute = ({ isAdmin, component: Component, ...routeProps }) => {
    const {user, loading, error} = useContext(AuthContext)
  
    if (!loading && user === false) {
      return <Navigate to="/login" />;
    }
  
    if (!loading && isAdmin === true && user?.role !== "admin") {
      return <Navigate to="/login" />;
    }
  
    return (
      <Fragment>
        {loading === false ? (

         <Component {...routeProps} />
        ) : null}
      </Fragment>
    );
  };     


 

export default ProtectedRoute;