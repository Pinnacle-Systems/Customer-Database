import React, { useState } from 'react';
import { useAddCustomerMutation, useGetCustomersQuery } from '../../../redux/services/createCustomer.service';
import { toast } from 'react-toastify';
import { useGetRelationQuery } from '../../../redux/services/RelationMasterService';
import secureLocalStorage from 'react-secure-storage';

const CreateCustomer = () => {
    const [relatives, setRelatives] = useState([{ type: '', name: '', dob: '', weddingDate: '' }]);
    const [customerData, setCustomerData] = useState([{ customerId: '', name: '', gender: '', email: '', phone: '', city: '', state: '', pin: '', married: '', weddingDate: '', members: '', working: '', age: '', purchaseDate: '', totalVisit: '', purchaseValue: '', totalValue: '', address: '' }]);
    const [addCustomer] = useAddCustomerMutation();
    const [searchValue, setSearchValue] = useState()

    const params = { companyId: secureLocalStorage.getItem(sessionStorage.getItem("sessionId") + "userCompanyId") }
    console.log(params, 'comp');
    const { data: allData, isLoading, isFetching } = useGetRelationQuery({ searchParams: searchValue });

    const handleRelativeChange = (index, event) => {
        const { name, value } = event.target;
        const newRelatives = [...relatives];
        newRelatives[index][name] = value;
        setRelatives(newRelatives);
    };

    const handleCustomerChange = (index, event) => {
        const { name, value } = event.target;
        const newCustomerData = [...customerData];
        newCustomerData[index][name] = value;
        setCustomerData(newCustomerData);
    };

    const deleteRow = (index) => {
        setRelatives(prev => prev.filter((_, i) => i !== index));
    };

    const addNewRow = () => {
        setRelatives(prev => [
            ...prev,
            { type: '', name: '', dob: '', weddingDate: '' }
        ]);
    };


    const saveData = async (event) => {
        event.preventDefault();

        if (!customerData) {
            toast.info("Please fill all required fields...!", {
                position: "top-center",
            });
            return;
        }

        if (!window.confirm("Are you sure you want to save the details?")) {
            return;
        }

        try {
            await addCustomer({ customerData, relatives }).unwrap();
            toast.success("Data saved successfully!", {
                position: "top-center",
            });
        } catch (error) {
            toast.error("Error saving data!", {
                position: "top-center",
            });
        }
    };

    return (
        <div className="h-full flex items-center justify-center bg-gray-100 ">
            <div className="bg-white p-1 rounded shadow-md w-full max-w-[90%] h-[90%] px-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Customer</h2>
                <form onSubmit={saveData} className="flex flex-col w-full ">
                    <div className='flex flex-col gap-8 h-full  border-[2px] px-3 pb-3'>
                        {customerData.map((item, index) => (
                            <div key={index} className='grid grid-cols-1 md:grid-cols-5 w-ful h-full gap-5 '>
                                <div className="flex flex-col">
                                    <label htmlFor="customerId" className="text-black">Customer ID:</label>
                                    <input
                                        type="text"
                                        name="customerId"
                                        value={item.customerId || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                        placeholder="ID"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="text-black">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={item.name || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="gender" className="text-black">Gender:</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={item.gender || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-black">Email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={item.email || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="text-black">Phone:</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={item.phone || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                        placeholder="Phone"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="city" className="text-black">City:</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={item.city || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="state" className="text-black">State:</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={item.state || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                        placeholder="State"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="pin" className="text-black">PIN Code:</label>
                                    <input
                                        type="text"
                                        name="pin"
                                        value={item.pin || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                        placeholder="PIN Code"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="married" className="text-black">Married Status:</label>
                                    <select
                                        id="married"
                                        name="married"
                                        value={item.married || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-3 py-1 border border-gray-300 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        <option value="married">Married</option>
                                        <option value="notMarried">Not Married</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="weddingDate" className="text-black">Wedding Date:</label>
                                    <input
                                        type="date"
                                        name="weddingDate"
                                        value={item.weddingDate || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="members" className="text-black">Number of Members:</label>
                                    <input
                                        type="text"
                                        name="members"
                                        value={item.members || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="working" className="text-black">Working Status:</label>
                                    <select
                                        id="working"
                                        name="working"
                                        value={item.working || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-3 py-1 border border-gray-300 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        <option value="working">Working</option>
                                        <option value="notWorking">Not Working</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="age" className="text-black">Age:</label>
                                    <input
                                        type="text"
                                        name="age"
                                        value={item.age || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="purchaseDate" className="text-black">Purchase Date:</label>
                                    <input
                                        type="date"
                                        name="purchaseDate"
                                        value={item.purchaseDate || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="totalVisit" className="text-black">Total Visits:</label>
                                    <input
                                        type="text"
                                        name="totalVisit"
                                        value={item.totalVisit || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="purchaseValue" className="text-black">Purchase Value:</label>
                                    <input
                                        type="text"
                                        name="purchaseValue"
                                        value={item.purchaseValue || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="totalValue" className="text-black">Total Value:</label>
                                    <input
                                        type="text"
                                        name="totalValue"
                                        value={item.totalValue || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="address" className="text-black">Address:</label>
                                    <input
                                        type="textarea"
                                        name="address"
                                        value={item.address || ''}
                                        onChange={(e) => handleCustomerChange(index, e)}
                                        className="w-full px-1 py-1 border border-gray-300 rounded"
                                    />
                                </div>
                            </div>
                        ))}

                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-1 py-1">Relative Type</th>
                                    <th className="border border-gray-300 px-1 py-1">Name</th>
                                    <th className="border border-gray-300 px-1 py-1">Date of Birth</th>
                                    <th className="border border-gray-300 px-1 py-1">Wedding Date</th>
                                    <th className="border border-gray-300 px-1 py-1"> <button
                                        type="button"
                                        onClick={addNewRow}
                                        className="bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600"
                                    >
                                        +
                                    </button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {relatives.map((relative, index) => (
                                    <tr key={index}>
                                        <select
                                            id={`type-${index}`}
                                            name="type"
                                            value={relative.type}
                                            onChange={(e) => handleRelativeChange(index, e)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                        >
                                            <option value="">Select</option>
                                            {allData && !isLoading && !isFetching ? (
                                                (allData?.data ? allData?.data : []).map((relation) => (
                                                    <option key={relation.type} value={relation.name}>{relation.name}</option>
                                                ))
                                            ) : (
                                                <option value="">Loading...</option>
                                            )}
                                        </select>
                                        <td className="border border-gray-300 px-1 py-1">
                                            <input
                                                type="text"
                                                name="name"
                                                value={relative.name || ''}
                                                onChange={(e) => handleRelativeChange(index, e)}
                                                className="w-full px-1 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-1 py-1">
                                            <input
                                                type="date"
                                                name="dob"
                                                value={relative.dob || ''}
                                                onChange={(e) => handleRelativeChange(index, e)}
                                                className="w-full px-1 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-1 py-1">
                                            <input
                                                type="date"
                                                name="weddingDate"
                                                value={relative.weddingDate || ''}
                                                onChange={(e) => handleRelativeChange(index, e)}
                                                className="w-full px-1 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-1  text-center">
                                            <button
                                                type="button"
                                                onClick={() => deleteRow(index)}
                                                className="bg-red-500 text-white  px-1 rounded hover:bg-red-600 "
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-1 px-1 rounded hover:bg-green-600 
                        w-[10%] "
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCustomer;
