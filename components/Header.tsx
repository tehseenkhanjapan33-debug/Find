
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const Header: React.FC = () => {
  const { state, logout } = useAppContext();
  const { isAuthenticated } = state;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="text-2xl font-bold text-primary">
            Find
          </Link>
          <nav>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:block">Welcome, {state.user?.email}</span>
                 <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary-100 hover:bg-primary-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary">
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
