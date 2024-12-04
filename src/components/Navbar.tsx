import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DeutschLernen</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <Link to="/practice" className="text-gray-600 hover:text-blue-600 transition-colors">
              Practice
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-blue-600 transition-colors">
              Community
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
              Resources
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Settings className="w-5 h-5" />
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Welcome, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/courses" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <Link to="/practice" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
              Practice
            </Link>
            <Link to="/community" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
              Community
            </Link>
            <Link to="/resources" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
              Resources
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 text-center text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="w-full px-4 py-2 text-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;