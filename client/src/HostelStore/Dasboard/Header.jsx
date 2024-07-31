import React, { useState } from 'react'

// import Dropdown from '../../components/Dropdown'

// import DropdownData from '../../Ui Component/modelUi';
import { HiOutlineRefresh } from 'react-icons/hi'
import NumericCard from '../../Basic/components/CommonPage/NumericCard';
import { useGetCustomersQuery } from '../../redux/services/createCustomer.service';
import secureLocalStorage from 'react-secure-storage';
import CusBirthdayList from './CusBirthdayList';

const Header = ({ misData }) => {

    return (
        <>

            <div className='h-[25%]'>
                <NumericCard misData={misData} />


            </div>
        </>
    )
}

export default Header