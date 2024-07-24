import React from 'react';

const CreateCustomer = () => {
    return (
        <div className="h-full flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-[80%]">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Customer</h2>
                <form className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-black">Customer ID:</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's Id"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-black">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's name"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Male" className="text-black">Gender:</label>
                        <select
                            id="Male"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Select</option>

                            <option value="Male">Male</option>
                            <option value="notWorking">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-black">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-black">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's phone number"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="city" className="text-black">City:</label>
                        <input
                            type="text"
                            id="city"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's city"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="state" className="text-black">State:</label>
                        <input
                            type="text"
                            id="state"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's state"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="zip" className="text-black">PIN Code:</label>
                        <input
                            type="text"
                            id="zip"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Pin code"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="married" className="text-black">Married Status:</label>
                        <select
                            id="married"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="married">Married</option>
                            <option value="notMarried">Not Married</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="weddingDate" className="text-black">Wedding Date:</label>
                        <input
                            type="date"
                            id="weddingDate"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="members" className="text-black">Number of Members:</label>
                        <input
                            type="number"
                            id="members"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter number of members"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="working" className="text-black">Working Status:</label>
                        <select
                            id="working"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="working">Working</option>
                            <option value="notWorking">Not Working</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-black">Age:</label>
                        <input
                            type="number"
                            id="age"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's age"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-black"> purchase Date:</label>
                        <input
                            type="number"
                            id="age"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder=" purchase Date"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-black">Total visit:</label>
                        <input
                            type="number"
                            id="age"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's a visits"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-black"> purchase value:</label>
                        <input
                            type="number"
                            id="age"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's Purchase Value"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-black">Total value:</label>
                        <input
                            type="number"
                            id="age"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder=" Total value "
                        />
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="address" className="text-black">Address:</label>
                        <textarea
                            id="address"
                            className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter customer's address"
                        ></textarea>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-center">
                        <button
                            type="submit"
                            className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCustomer;
