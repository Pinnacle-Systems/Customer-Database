import React, { useState } from 'react';
import moment from 'moment';

const CusBirthdayList = ({ misData }) => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

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

    return (
        <div className="w-full p-2 flex border gap-3 letter">
            <div className='flex flex-col items-end w-full'>
                <div className='flex items-center '> <h1 className="text-[14px] font-semiBold">
                    Selected Date
                </h1>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className=" p-1 border rounded"
                    /></div>
                <div className='w-full flex gap-5 border'>
                    <div className="w-[50%]">
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded">Birthday Wishes</h1>
                        <div className="bg-white border overflow-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className='border'>
                                        <th className="border p-1 text-left text-[14px]">No</th>
                                        <th className="border p-1 text-left text-[14px]">Name</th>
                                        <th className="border p-1 text-left text-[14px]">Phone</th>
                                        <th className="border p-1 text-left text-[14px]">Relations</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {todayBirthdays.map((customer, index) => (
                                        <tr key={customer.id} className='border'>
                                            <td className="p-1 text-[12px] border w-3">{index + 1}</td>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded">Wedding Day Wishes</h1>
                        <div className="bg-white border overflow-auto">
                            <table className="min-w-full border">
                                <thead>
                                    <tr className='border'>
                                        <th className="border p-1 text-left text-[14px]">No</th>
                                        <th className="border p-1 text-left text-[14px]">Name</th>
                                        <th className="border p-1 text-left text-[14px]">Phone</th>
                                        <th className="border p-1 text-left text-[14px]">Relations</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {todayWedding.map((customer, index) => (
                                        <tr className='text-[12px]' key={customer.id}>
                                            <td className="p-1 text-[12px] border">{index + 1}</td>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CusBirthdayList;
