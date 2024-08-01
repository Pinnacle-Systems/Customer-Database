import React, { useState } from 'react';
import moment from 'moment';
import { TablePagination } from '@material-ui/core';

const CusBirthdayList = ({ misData }) => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const isSameDay = (date, targetDate) => {
        const d = new Date(date);
        const t = new Date(targetDate);
        return (
            d.getDate() === t.getDate() &&
            d.getMonth() === t.getMonth()
        );
    };

    const filterByDate = (data, targetDate) => {
        return data.filter(customer =>
            isSameDay(customer.dob, targetDate) ||
            (customer.customerRelations && customer.customerRelations.some(relation => isSameDay(relation.dob, targetDate)))
        );
    };

    const filterByWedDate = (data, targetDate) => {
        return data.filter(customer =>
            isSameDay(customer.weddingDate, targetDate) ||
            (customer.customerRelations && customer.customerRelations.some(relation => isSameDay(relation.weddingDate, targetDate)))
        );
    };

    const todayBirthdays = filterByDate(misData?.data || [], selectedDate);
    const todayWedding = filterByWedDate(misData?.data || [], selectedDate);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="w-full p-2 flex border gap-3 letter">
            <div className='flex flex-col items-end w-full'>
                <div className='flex items-center '>
                    <h1 className="text-[14px] font-semiBold">Selected Date :</h1>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className=" p-1 border rounded text-[12px]"
                    />
                </div>
                <div className='w-full flex gap-5 border'>
                    <div className="w-[50%]">
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded">Birthday Wishes</h1>
                        <div className="bg-white  overflow-auto">
                            <table className="min-w-full divide-y border">
                                <thead>
                                    <tr className='border'>
                                        <th className="border p-1 text-left text-[14px]">No</th>
                                        <th className="border p-1 text-left text-[14px]">Name</th>
                                        <th className="border p-1 text-left text-[14px]">Phone</th>
                                        <th className="border p-1 text-left text-[14px]">Wishes</th>
                                        <th className="border p-1 text-left text-[14px]">Select</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {todayBirthdays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                                        <tr key={customer.id} className=''>
                                            <td className="p-1 text-[12px] border w-3">{index + 1 + page * rowsPerPage}</td>
                                            <td className="p-1 text-[12px] border">{customer.name}</td>
                                            <td className="p-1 text-[12px] border">{customer.phone}</td>
                                            <td className="p-1 text-[12px] border">
                                                {isSameDay(customer.dob, selectedDate) ? (
                                                    <p className='p-1'>Many more happy returns of the day <span className='text-blue-700'>{customer.name}</span></p>
                                                ) : null}
                                                {customer.customerRelations && customer.customerRelations.map((relation, relIndex) => (
                                                    isSameDay(relation.dob, selectedDate) && (
                                                        <div key={relIndex} className='p-1'>
                                                            Many more happy returns of the day <span className='text-blue-700'>{relation.name}</span>
                                                        </div>
                                                    )
                                                ))}
                                            </td>
                                            <td className='flex p-1 w-full h-full gap-2 items-center justify-center '>
                                                <input type="checkbox" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <TablePagination
                                component="div"
                                count={todayBirthdays.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded">Wedding Day Wishes</h1>
                        <div className="bg-white border overflow-auto">
                            <table className="min-w-full border">
                                <thead>
                                    <tr className='border'>
                                        <th className="border p-1 text-left text-[14px] w-3">No</th>
                                        <th className="border p-1 text-left text-[14px]">Name</th>
                                        <th className="border p-1 text-left text-[14px]">Phone</th>
                                        <th className="border p-1 text-left text-[14px]">Wishes</th>
                                        <th className="border p-1 text-left text-[14px]">Select</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {todayWedding.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                                        <tr className='text-[12px]' key={customer.id}>
                                            <td className="p-1 text-[12px] border">{index + 1 + page * rowsPerPage}</td>
                                            <td className="p-1 text-[12px] border">{customer.name}</td>
                                            <td className="p-1 text-[12px] border">{customer.phone}</td>
                                            <td className="p-1 text-[12px] border">
                                                {isSameDay(customer.weddingDate, selectedDate) ? (
                                                    <p className='p-1'>Happy Wedding Anniversary <span className='text-blue-700'>{customer.name}</span></p>
                                                ) : null}
                                                {customer.customerRelations && customer.customerRelations.map((relation, relIndex) => (
                                                    isSameDay(relation.weddingDate, selectedDate) && (
                                                        <div key={relIndex}>
                                                            Happy Wedding Anniversary <span className='text-blue-700'>{relation.name}</span>
                                                        </div>
                                                    )
                                                ))}
                                            </td>
                                            <td className='flex p-1 w-full h-full gap-2 items-center justify-center'>
                                                <input type="checkbox" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <TablePagination
                                component="div"
                                count={todayWedding.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CusBirthdayList;
