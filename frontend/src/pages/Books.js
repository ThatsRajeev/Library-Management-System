import React from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

const Books = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BookForm />
                <div className="bg-white shadow p-6 rounded-lg">
                    <BookList />
                </div>
            </div>
        </div>
    );
};

export default Books;
