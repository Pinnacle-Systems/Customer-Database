import React, { useState } from 'react'
import Header from './Header'
import CusBirthdayList from './CusBirthdayList'
import { useGetCustomersQuery } from '../../redux/services/createCustomer.service';
import secureLocalStorage from 'react-secure-storage';
import ReltionData from './cusRelationList';
import { useGetCustomersRelationQuery } from '../../redux/services/customerRelationService';


const MisDashboard = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('Detailed1');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const params = { companyId: secureLocalStorage.getItem(sessionStorage.getItem("sessionId") + "userCompanyId") };
    const { data: misData, isLoading, refetch } = useGetCustomersQuery({ searchParams: searchValue, params: params });
    const { data: relData } = useGetCustomersRelationQuery()


    return (
        <div className='h-[90%] w-full px-1 mb-2 overflow-scroll'>
            <Header />
            <div className='flex flex-col w-full items-center justify-center gap-5 mt-2'>
                <div className='flex flex-col w-full'>
                    <h1 className='font-semibold'>Customer Info</h1>
                    <CusBirthdayList misData={misData} />
                </div>
                {/* <div className='flex flex-col'>
                    <h1 className='font-semibold'>relation's data</h1>
                    <div><ReltionData relData={relData} /></div>
                </div> */}
            </div>

        </div>
    )
}

export default MisDashboard