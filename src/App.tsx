import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { ExpenseTracker } from './components/ExpenseTracker';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <ExpenseTracker />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;