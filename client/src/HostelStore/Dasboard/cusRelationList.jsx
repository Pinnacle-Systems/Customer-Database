import moment from 'moment';
import React from 'react';

const ReltionData = ({ relData }) => {
    const today = new Date();
    const tmrw = new Date();
    const tomorrow = tmrw.setDate(today.getDate() + 1);

    const isToday = (date) => {
        const d = new Date(date);
        return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth()
        );
    };

    const isTomorrow = (date) => {
        const d = new Date(date);
        return (
            d.getDate() === tmrw.getDate() &&
            d.getMonth() === tmrw.getMonth()
        );
    };
    console.log(relData, 'rel');
    const filterByDate = (data, checkDate) => {
        return data.filter(customer => checkDate(customer.dob));
    };
    const filterByWedDate = (data, checkDate) => {
        return data.filter(customer => checkDate(customer.weddingDate));
    };

    const todayBirthdays = filterByDate(relData?.data || [], isToday);
    const tomorrowBirthdays = filterByDate(relData?.data || [], isTomorrow);
    const todayWedding = filterByWedDate(relData?.data || [], isToday);
    const tomorrowWedding = filterByWedDate(relData?.data || [], isTomorrow);
    console.log(todayBirthdays, 'todayWedding');
    console.log(tomorrowBirthdays, 'todayWedding');
    console.log(todayWedding, 'todayWedding');
    console.log(tomorrowWedding, 'todayWedding');
    return (
        <div className="mx-auto p-2 flex border gap-3">

            <div className='flex flex-col items-center '>
                <h1 className="text-[14px] font-semiBold mb-2">Today Report - {moment(today).format('DD/MM/YYYY')}</h1>
                <div className='w-full flex gap-5 border p-2'>
                    <div>
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded"> Birthday List</h1>

                        <table className="bg-white border overflow-auto">
                            <thead>
                                <tr className='text-[12px]'>
                                    <th className="px-4 py-2 text-left">S/no</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Relationship type</th>
                                    <th className="py-2 px-4 border">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayBirthdays.map((customer, index) => (
                                    <tr key={customer.id} className='text-[12px]'>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="py-2 px-4 border">{customer.name}</td>
                                        <td className="py-2 px-4 border">{customer.type}</td>
                                        <td className="py-2 px-4 border">{customer.phoneNumber
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded"> Wedding Day List </h1>
                        <table className="min-w-full bg-white border overflow-auto">
                            <thead>
                                <tr className='text-[12px]'>
                                    <th className="px-4 py-2 text-left">S/no</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Relationship type</th>
                                    <th className="py-2 px-4 border">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayWedding.map((customer, index) => (
                                    <tr key={customer.id} className='text-[12px]'>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="py-2 px-4 border">{customer.name}</td>
                                        <td className="py-2 px-4 border">{customer.type}</td>
                                        <td className="py-2 px-4 border">{customer.
                                            phoneNumber
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <h1 className="text-[14px] font-semibold mb-2">Tomorrow Report - {moment(tomorrow).format('DD/MM/YYYY')}</h1>
                <div className='w-full flex gap-5 border p-2'>
                    <div>
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded"> Birthday List </h1>
                        <table className="bg-white border overflow-auto">
                            <thead>
                                <tr className='text-[12px]'>
                                    <th className="px-4 py-2 text-left">S/no</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Relationship type</th>
                                    <th className="py-2 px-4 border">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tomorrowBirthdays.map((customer, index) => (
                                    <tr key={customer.id} className='text-[12px]'>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="py-2 px-4 border">{customer.name}</td>
                                        <td className="py-2 px-4 border">{customer.type}</td>
                                        <td className="py-2 px-4 border">{customer.
                                            phoneNumber
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h1 className="text-[13px] font-semibold mb-2 bg-gray-200 p-1 rounded"> Wedding Day List </h1>
                        <table className="min-w-full bg-white border overflow-auto">
                            <thead>
                                <tr className='text-[12px]'>
                                    <th className="px-4 py-2 text-left">S/no</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Relationship type</th>
                                    <th className="py-2 px-4 border">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tomorrowWedding.map((customer, index) => (
                                    <tr key={customer.id} className='text-[12px]'>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="py-2 px-4 border">{customer.name}</td>
                                        <td className="py-2 px-4 border">{customer.type}</td>
                                        <td className="py-2 px-4 border">{customer.
                                            phoneNumber
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReltionData;
