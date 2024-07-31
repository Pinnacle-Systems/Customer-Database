import React, { useEffect, useState } from 'react';
import { useGetCustomersQuery } from '../../../redux/services/createCustomer.service';
import secureLocalStorage from 'react-secure-storage';
import moment from 'moment';
import { getImageUrlPath } from '../../../Constants';


const CustomerReport = () => {
    const [customers, setCustomers] = useState([]);
    const [currentOpenNumber, setCurrentOpenNumber] = useState(null);
    const [singleData, setSingleData] = useState({});
    const [searchValue, setSearchValue] = useState('');

    const params = { companyId: secureLocalStorage.getItem(sessionStorage.getItem("sessionId") + "userCompanyId") };
    const { data: dt, isLoading } = useGetCustomersQuery({ searchParams: searchValue, params: params });

    useEffect(() => {
        if (dt && dt.data) {
            setCustomers(dt.data);
        }
    }, [dt]);

    const filteredCustomers = customers.filter(customer =>
        customer.phone.includes(searchValue)
    );

    return (
        <div className="h-full flex  w-full">
            <div className=" p-2 rounded shadow-md w-full">
                <div className='flex p-1 w-full text-center rounded-t text-[15px] justify-between'>
                    <h2 className="text-xl font-bold">Customer Report</h2>
                    <input
                        type="text"
                        placeholder="Search by phone number"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="p-1 border rounded"
                    />
                </div>
                <table className="table-auto text-center w-full border-collapse">
                    <thead className="bg-gray-300">
                        <tr className='h-8 text-[14px]'>
                            <th className="p-2 border border-white">S/no</th>
                            <th className="p-2 border border-white">Phone</th>
                            <th className="p-2 border border-white">Customer ID</th>
                            <th className="p-2 border border-white">Name</th>
                            <th className="p-2 border border-white">Email</th>
                            <th className="p-2 border border-white">Pan</th>
                            <th className="p-2 border border-white">Gender</th>
                            <th className="p-2 border border-white">City</th>
                            <th className="p-2 border border-white">Working Status</th>
                            <th className="p-2 border border-white">DOB</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <tbody>
                            <tr>
                                <td colSpan="10" className="p-5 text-center">LOADING...</td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {filteredCustomers.map((customer, index) => (
                                <React.Fragment key={customer.id}>
                                    <tr
                                        className={`hover:bg-gray-100 cursor-pointer text-[12px] even:bg-gray-200 odd:bg-white
                                        ${currentOpenNumber === index ? "bg-gray-200" : ""}`}

                                    >
                                        <td className='py-2 border w-8'  >{index + 1}</td>
                                        <td className='py-2 text-left border'>{customer.phone}</td>
                                        <td className='py-2 text-left border'>{customer.docId}</td>
                                        <td className='py-2 text-left border'><a onClick={() => {
                                            setCurrentOpenNumber(currentOpenNumber === index ? null : index);
                                            if (currentOpenNumber !== index) {
                                                setSingleData(customer);
                                            }
                                        }} className='text-blue-500 underline'> {customer.name}</a></td>
                                        <td className='py-2 text-left border'>{customer.email}</td>
                                        <td className='py-2 text-left border'>{customer.panNo}</td>
                                        <td className='py-2 text-left border'>{customer.gender}</td>
                                        <td className='py-2 text-left border'>{customer.city}</td>
                                        <td className='py-2 text-left border'>{customer.workingStatus}</td>
                                        <td className='py-2 text-left border'>{customer.dob ? moment.utc(customer.dob).format('DD-MM-YYYY') : ''}</td>
                                    </tr>
                                    {currentOpenNumber === index && (
                                        <tr className='border'>
                                            <td colSpan="10">
                                                <table className="border text-xs w-full mt-2">
                                                    <thead className="bg-gray-300">
                                                        <tr>
                                                            <th className="p-2 border">Profile</th>
                                                            <th className="p-2 border w-8">S. no.</th>
                                                            <th className="p-2 border">Name</th>
                                                            <th className="p-2 border">Relation</th>
                                                            <th className="p-2 border">DOB</th>
                                                            <th className="p-2 border">Wedding Date</th>
                                                            <th className="p-2 border">Phone Number</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {customer.customerRelations?.map((relation, itemIndex) => (
                                                            <tr key={itemIndex}>
                                                                {itemIndex === 0 && (
                                                                    <td className="p-2 border w-44" rowSpan={customer.customerRelations.length}>
                                                                        <img src={getImageUrlPath(customer.image)} alt={"employee"} className='rounded h-32 w-22' />
                                                                    </td>
                                                                )}
                                                                <td className='border py-2'>{itemIndex + 1}</td>
                                                                <td className='border p-2'>{relation.name}</td>
                                                                <td className='border p-2'>{relation.type}</td>
                                                                <td className='border p-2'>{moment.utc(relation.dob).format('DD-MM-YYYY')}</td>
                                                                <td className='border p-2'>{moment.utc(relation.weddingDate).format('DD-MM-YYYY')}</td>
                                                                <td className='border p-2'>{relation.phoneNumber || 'N/A'}</td>

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default CustomerReport;
