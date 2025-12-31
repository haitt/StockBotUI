import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import WelcomePage from './pages/WelcomePage';
import WatchListsPage from './pages/WatchListsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/stock/watch-lists" replace />
          ) : (
            <WelcomePage />
          )
        }
      />
      <Route
        path="/stock/watch-lists"
        element={
          <ProtectedRoute>
            <WatchListsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App
