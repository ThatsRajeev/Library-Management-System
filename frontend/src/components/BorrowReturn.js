import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowReturn = () => {
    const [bookId, setBookId] = useState('');
    const [userId, setUserId] = useState('');
    const [returnUserId, setReturnUserId] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [borrowResult, setBorrowResult] = useState(null);
    const [returnResult, setReturnResult] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch books and users for dropdowns
        const fetchOptions = async () => {
            try {
              const booksResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/books`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                const usersResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                setBooks(booksResponse.data);
                setUsers(usersResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchOptions();
    }, []);

    const handleBorrow = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/transactions/borrow`, { bookId, userId }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setBorrowResult({ success: true, message: response.data.message, data: response.data.transaction }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        } catch (error) {
            setBorrowResult({ success: false, message: error.response?.data?.message || 'Error borrowing book' });
        }
    };

    const handleReturn = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/transactions/return/${transactionId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setReturnResult({ success: true, message: response.data.message, data: response.data.transaction });
        } catch (error) {
            setReturnResult({ success: false, message: error.response?.data?.message || 'Error returning book' });
        }
    };

    const fetchBorrowedBooks = async (userId) => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/transactions/borrowed/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setBorrowedBooks(response.data);
        } catch (err) {
            console.error('Error fetching borrowed books:', err);
        }
    };

    useEffect(() => {
        // Fetch borrowed books when a user is selected for return
        if (returnUserId) {
            fetchBorrowedBooks(returnUserId);
        }
    }, [returnUserId]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Borrow a Book</h2>
            <form
                className="grid gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleBorrow();
                }}
            >

                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="userId">
                        Select User for Borrow
                    </label>
                    <select
                        id="userId"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name} - {user.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="bookId">
                        Select Book to Borrow
                    </label>
                    <select
                        id="bookId"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    >
                        <option value="">Select a book</option>
                        {books.map((book) => (
                            <option key={book._id} value={book._id}>
                                {book.title} by {book.author}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Borrow Book
                </button>
            </form>

            {borrowResult && (
                <div
                    className={`mt-4 p-4 rounded ${borrowResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                    {borrowResult.message}
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Return a Book</h2>
            <form
                className="grid gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleReturn();
                }}
            >
                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="returnUserId">
                        Select User for Return
                    </label>
                    <select
                        id="returnUserId"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={returnUserId}
                        onChange={(e) => setReturnUserId(e.target.value)}
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name} - {user.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2" htmlFor="transactionId">
                        Select Book to Return
                    </label>
                    <select
                        id="transactionId"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                    >
                        <option value="">Select a borrowed book</option>
                        {borrowedBooks.map((transaction) => (
                            <option key={transaction._id} value={transaction._id}>
                                {transaction.bookId.title} by {transaction.bookId.author}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                    Return Book
                </button>
            </form>

            {returnResult && (
                <div
                    className={`mt-4 p-4 rounded ${returnResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                    {returnResult.message}
                </div>
            )}
        </div>
    );
};

export default BorrowReturn;
