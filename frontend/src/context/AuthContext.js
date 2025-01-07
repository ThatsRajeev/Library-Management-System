import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false); 
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, { email, password });
            localStorage.setItem('token', data.token);
            setUser(jwtDecode(data.token));
        } catch (err) {
            alert('Login failed: ' + err.response?.data?.message || 'An error occurred.');
        }
    };

    const register = async (name, email, password, isAdmin) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, { name, email, password, isAdmin });
            alert('Registration successful!');
        } catch (err) {
            alert('Registration failed: ' + err.response?.data?.message || 'An error occurred.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
