import React from 'react'

import CardWrapper from './Cardwrapper';
const NumericCard = ({ misData }) => {

    const totalTurnOver = misData?.data?.totalTurnOver || '';
    const profit = misData?.data?.profit || '';
    const newCustomers = misData?.data?.newCustomers || '';
    const topCustomers = misData?.data?.topCustomers || '';
    const loss = misData?.data?.loss || '';
    const data = [
        {
            name: "Total Visits",
            borderColor: "#1F588B",
            value: `₹${(totalTurnOver?.currentValue || 0).toLocaleString()}`,
            qty: `${(totalTurnOver?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(totalTurnOver?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(totalTurnOver?.prevQty || 0).toLocaleString()}`,

        },
        {
            name: "Total Purchase",
            borderColor: "#62AAA3",
            value: `₹${(profit?.currentValue || 0).toLocaleString().toLocaleString()}`,
            qty: `${(profit?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(profit?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(profit?.prevQty || 0).toLocaleString()}`,


        },
        {
            name: "New Customers",
            borderColor: "border-[#96A669]",
            value: `₹${(newCustomers?.currentValue || 0).toLocaleString().toLocaleString()}`,
            qty: `₹${(newCustomers?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(newCustomers?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(newCustomers?.prevQty || 0).toLocaleString()}`,
        },
        {
            name: "Top 5 Customers",
            borderColor: "border-[#D49B37]",
            value: `₹${(topCustomers?.currentValue || 0).toLocaleString().toLocaleString()}`,
            qty: `₹${(topCustomers?.currentQty || 0).toLocaleString()}`,
            previousValue: `₹${(topCustomers?.prevValue || 0).toLocaleString()}`,
            previousQty: `₹${(topCustomers?.prevQty || 0).toLocaleString()}`,
        },

    ]
    return (
        <div className='flex justify-around w-full h-full'>
            {data.map((val, i) =>
                <div key={i} className='w-[24.5%] h-full text-center '>
                    <CardWrapper name={val.name} >
                        <div className={`h-full grid items-center bg-white border-4 cuttedBorder${i + 1}`}
                        >
                            <div className='flex justify-between px-4'>
                                <div>
                                    <h1 className='text-sm font-semibold'>Qty</h1>
                                    <span className='text-[14px] font-bold'>
                                        {val.qty}
                                    </span></div>
                                <span className='text-[14px] font-bold'>
                                    <h1 className='text-sm font-semibold'>Value</h1>
                                    {val.value}
                                </span>
                            </div>
                            <div className='flex justify-between px-4 text-gray-800 text-[12px]'>
                                <span>
                                    <div className='font-medium '>
                                        Prev Qty
                                    </div>
                                    <div>
                                        {val.previousQty}
                                    </div>
                                </span>
                                <span>
                                    <div className='font-medium '>Prev Val</div>
                                    <div>{val.previousValue}</div>
                                </span>
                                {/* <div className='grid items-center justify-center text-center'>
                                    <div className='text-center '>Trend</div>
                                    <div className='text-sm flex items-center justify-center'>
                                        {val.trend}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </CardWrapper>
                </div>
            )}
        </div>

    )
}
export default NumericCard;