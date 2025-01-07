import React from 'react';
import BorrowReturn from '../components/BorrowReturn';

const Transactions = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Transactions</h1>
            <div className="bg-white shadow p-6 rounded-lg">
                <BorrowReturn />
            </div>
        </div>
    );
};

export default Transactions;
