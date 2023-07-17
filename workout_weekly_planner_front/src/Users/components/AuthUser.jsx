import React from 'react';
import { Redirect } from 'react-router-dom';

const requireAuth = (Component) => {
  const isAuthenticated = localStorage.getItem('token'); 

  return (props) => {
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
};

export default requireAuth;
