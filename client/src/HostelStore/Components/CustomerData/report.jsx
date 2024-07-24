// CustomerReport.js

import React, { useEffect, useState } from 'react';


const CustomerReport = () => {
    const [customers, setCustomers] = useState([]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Customer Report</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Customer ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Gender</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">City</th>
                            <th className="px-4 py-2 border">State</th>
                            <th className="px-4 py-2 border">PIN Code</th>
                            <th className="px-4 py-2 border">Married Status</th>
                            <th className="px-4 py-2 border">Wedding Date</th>
                            <th className="px-4 py-2 border">Number of Members</th>
                            <th className="px-4 py-2 border">Working Status</th>
                            <th className="px-4 py-2 border">Age</th>
                            <th className="px-4 py-2 border">Last Purchase Date</th>
                            <th className="px-4 py-2 border">Total Visits</th>
                            <th className="px-4 py-2 border">Purchase Value</th>
                            <th className="px-4 py-2 border">Total Value</th>
                            <th className="px-4 py-2 border">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-4 py-2 border">{customer.id}</td>
                                <td className="px-4 py-2 border">{customer.name}</td>
                                <td className="px-4 py-2 border">{customer.gender}</td>
                                <td className="px-4 py-2 border">{customer.email}</td>
                                <td className="px-4 py-2 border">{customer.phone}</td>
                                <td className="px-4 py-2 border">{customer.city}</td>
                                <td className="px-4 py-2 border">{customer.state}</td>
                                <td className="px-4 py-2 border">{customer.pinCode}</td>
                                <td className="px-4 py-2 border">{customer.marriedStatus}</td>
                                <td className="px-4 py-2 border">{customer.weddingDate}</td>
                                <td className="px-4 py-2 border">{customer.members}</td>
                                <td className="px-4 py-2 border">{customer.workingStatus}</td>
                                <td className="px-4 py-2 border">{customer.age}</td>
                                <td className="px-4 py-2 border">{customer.lastPurchaseDate}</td>
                                <td className="px-4 py-2 border">{customer.totalVisits}</td>
                                <td className="px-4 py-2 border">{customer.purchaseValue}</td>
                                <td className="px-4 py-2 border">{customer.totalValue}</td>
                                <td className="px-4 py-2 border">{customer.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerReport;
