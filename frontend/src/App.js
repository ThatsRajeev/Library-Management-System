import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Users from './pages/Users';
import Transactions from './pages/Transactions';

function App() {
    return (
        <AuthProvider>
          <Router>
              <div>
                  <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
                      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                  </Routes>
              </div>
          </Router>
        </AuthProvider>
    );
}

export default App;
