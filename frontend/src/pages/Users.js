import React from 'react';
import UserForm from '../components/UserForm';

const Users = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Users</h1>
            <div className="bg-white shadow p-6 rounded-lg">
                <UserForm />
            </div>
        </div>
    );
};

export default Users;
