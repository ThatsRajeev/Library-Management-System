import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/books`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(response => setBooks(response.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Books</h2>
            <ul className="space-y-2">
                {books.map(book => (
                    <li
                        key={book._id}
                        className="p-4 bg-gray-50 rounded shadow hover:bg-gray-100 flex justify-between"
                    >
                        <span>
                            <strong>{book.title}</strong> by {book.author} ({book.publicationYear})
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full ${
                                book.availabilityStatus
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {book.availabilityStatus ? "Available" : "Borrowed"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
