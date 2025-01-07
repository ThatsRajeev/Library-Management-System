import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Library Dashboard</h1>
            <p className="text-gray-700 mb-8">Welcome to the Library Management System!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/books" className="bg-blue-600 text-white py-3 px-4 rounded shadow hover:bg-blue-700 transition">
                    Manage Books
                </Link>
                <Link to="/users" className="bg-green-600 text-white py-3 px-4 rounded shadow hover:bg-green-700 transition">
                    Manage Users
                </Link>
                <Link to="/transactions" className="bg-yellow-600 text-white py-3 px-4 rounded shadow hover:bg-yellow-700 transition">
                    Manage Transactions
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
