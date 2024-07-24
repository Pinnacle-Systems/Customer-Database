import React, { useEffect, useState, Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetCustomersQuery } from '../../../redux/services/createCustomer.service';
import secureLocalStorage from 'react-secure-storage';

const CustomerReport = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [dataPerPage] = useState(10); // Adjust this value as needed
    const [currentOpenNumber, setCurrentOpenNumber] = useState(null);
    const [singleData, setSingleData] = useState({});
    const [searchValue, setSearchValue] = useState()

    const params = { companyId: secureLocalStorage.getItem(sessionStorage.getItem("sessionId") + "userCompanyId") }
    console.log(params, 'comp');
    const { data: dt, isLoading } = useGetCustomersQuery({ searchParams: searchValue, params: params });

    useEffect(() => {
        if (dt && dt.data) {
            setCustomers(dt.data);
            setTotalCount(dt.totalCount); // Ensure `totalCount` is part of your response
        }
    }, [dt]);

    const handleOnClick = ({ selected }) => {
        setCurrentPageNumber(selected + 1);
    };

    const getDateFromDateTimeToDisplay = (dateTime) => {
        return new Date(dateTime).toLocaleDateString();
    };

    return (
        <div className="h-full flex  bg-gray-100">
            <div className="bg-white p-2 rounded shadow-md w-full ">
                <h2 className="text-2xl font-bold bg-sky-300 text-center">Customer Report</h2>
                <table className="table-fixed text-center w-full">
                    <thead className="bg-gray-200">
                        <tr className='h-10'>
                            <th className="w-10">S. no.</th>
                            <th className="w-20">Customer ID</th>
                            <th className="w-32">Name</th>
                            <th className="w-32">Email</th>
                            <th className="w-32">Phone</th>
                            <th className="w-32">Address</th>
                            <th className="w-32">City</th>
                            <th className="w-32">Gender</th>
                            <th className="w-32">Family Members</th>
                            <th className="w-32">workingStatus
                            </th>




                        </tr>
                    </thead>
                    {isLoading ?
                        <tbody>
                            <tr>
                                <td colSpan="8">
                                    LOADING...
                                </td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {customers.map((customer, index) => (
                                <Fragment key={customer.id}>
                                    <tr
                                        className={`hover:bg-gray-100 cursor-pointer ${currentOpenNumber === index ? "bg-gray-200" : ""}`}
                                        onClick={() => {
                                            setCurrentOpenNumber(currentOpenNumber === index ? null : index);
                                            if (currentOpenNumber !== index) {
                                                setSingleData(customer);
                                            }
                                        }}
                                    >
                                        <td className='py-1 border'>{(currentPageNumber - 1) * dataPerPage + index + 1}</td>
                                        <td className='py-1 text-left border'>{customer.customerDetId}</td>
                                        <td className='py-1 text-left border'>{customer.name}</td>
                                        <td className='py-1 text-left border'>{customer.email}</td>
                                        <td className='py-1 text-left border'>{customer.phone}</td>
                                        <td className='py-1 text-left border'>{customer.address}</td>
                                        <td className='py-1 text-left border'>{customer.PurchaseDate}</td>
                                        <td className='py-1 text-left border'>{customer.gender}</td>
                                        <td className='py-1 text-left border'>{customer.members}</td>
                                        <td className='py-1 text-left border'>{customer.workingStatus}</td>


                                    </tr>
                                    {currentOpenNumber === index && (
                                        <tr>
                                            <td colSpan="8">
                                                <table className="border text-xs w-full mt-1">
                                                    <thead className="bg-gray-300">
                                                        <tr className='h-10'>
                                                            <th className="w-10">S. no.</th>
                                                            <th className="w-32">Name</th>
                                                            <th className="w-32">Gender</th>
                                                            <th className="w-32">DOB</th>
                                                            <th className="w-32">Phone Number</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {customer.customerRelations?.map((relation, itemIndex) => (
                                                            <tr key={itemIndex}>
                                                                <td className='border'>{itemIndex + 1}</td>
                                                                <td className='border'>{relation.name}</td>
                                                                <td className='border'>{relation.gender}</td>
                                                                <td className='border'>{getDateFromDateTimeToDisplay(relation.dob)}</td>
                                                                <td className='border'>{relation.phoneNumber || 'N/A'}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}

                        </tbody>
                    }
                </table>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    forcePage={currentPageNumber - 1}
                    pageCount={Math.ceil(totalCount / dataPerPage)}
                    marginPagesDisplayed={2}
                    onPageChange={handleOnClick}
                    containerClassName={"flex justify-center m-2 gap-5 items-center"}
                    pageClassName={"border p-1"}
                    previousLinkClassName={"border p-1"}
                    nextLinkClassName={"border p-1"}
                    activeClassName={"bg-blue-900 text-white"}
                />
            </div>
        </div>
    );
};

export default CustomerReport;
