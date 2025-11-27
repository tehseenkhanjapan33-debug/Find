import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

// Fix: Changed type of children from JSX.Element to React.ReactNode to resolve namespace issue.
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAppContext();
  const { isAuthenticated } = state;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
