import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ChatProvider } from './context/ChatContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    return !user ? children : <Navigate to="/" />;
};

function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <ChatProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            } />
                            <Route path="/login" element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            } />
                            <Route path="/register" element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            } />
                        </Routes>
                    </Router>
                </ChatProvider>
            </SocketProvider>
        </AuthProvider>
    );
}

export default App;
