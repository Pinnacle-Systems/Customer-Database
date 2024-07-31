import React from 'react'

const CardWrapper = ({ name, children }) => {
    return (
        <div className='w-full h-full text-center border border-gray-200'>
            <div className={`bg-gradient-to-b from-[#afafae] text-center rounded-xs flex items-center justify-center h-[30px] border-2 border-[#E0E0E0] text-gray-800`}>
                <span className='text-[14px] font-semibold text-black'>{name}</span>
            </div>
            <div className='h-[80%] p-1  '>
                {children}
            </div>
        </div>
    )
}

export default CardWrapper