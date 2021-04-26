import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../Context/Auth/authContext';

const ToAuthRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loaded } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loaded ? (
            <Component {...props} />
        ) : (
          <Redirect to='/decks' />
        )
      }
    />
  );
};

export default ToAuthRoute;