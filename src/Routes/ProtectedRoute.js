import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../Context/Auth/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loaded } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        // If the user is not authenticated
        !isAuthenticated && !loaded ? (
          // Redirect to the login page
          <Redirect to='/login' />
        ) : (
          // Otherwise, display the requested page
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;