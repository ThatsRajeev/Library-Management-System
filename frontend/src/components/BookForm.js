import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publicationYear: '',
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

        if (!formData.title || !formData.author || !formData.publicationYear) {
            setError('All fields are required.');
            return;
        }

        const token = localStorage.getItem('token');
        axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/books`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setSuccessMessage('Book added successfully!');
                setFormData({ title: '', author: '', publicationYear: '' });
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
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
            />
            <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
            />
            <input
                type="number"
                name="publicationYear"
                placeholder="Publication Year"
                value={formData.publicationYear}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Add Book
            </button>
        </form>
    );
};

export default BookForm;
