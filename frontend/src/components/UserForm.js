import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!formData.name || !formData.email) {
            setError('All fields are required.');
            return;
        }

        const token = localStorage.getItem('token');
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/users`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setSuccessMessage('User added successfully!');
                setFormData({ name: '', email: '' });
            })
            .catch((err) => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Something went wrong. Please try again.');
                }
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow rounded-lg flex flex-col space-y-4"
        >
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
            />
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Add User
            </button>
        </form>
    );
};

export default UserForm;
