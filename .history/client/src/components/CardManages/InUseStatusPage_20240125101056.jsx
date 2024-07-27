import React from 'react';

const InUseStatusPage = () => {
    return (
        <div className='box-border w-full h-full'>
            <div className='flex w-full text-[#36735B] font-bold text-2xl mb-[5%]'>
                <p className='grid w-full grid-cols-1 text-center'>ID</p>
                <p className='grid w-full grid-cols-1 text-center'>状況</p>
            </div>

            <div className='w-full'>
                
                <li className='flex items-center justify-around w-full text-xl text-center border border-[#36735B] rounded-t-xl'>
                    <p className='h-full w-full py-2 border-r border-r-[#36735B] border-b-[#36735B] text-[#36735B] font-medium'>999999</p>
                    <p className='w-full h-full py-2 text-yellow-600'>使用中</p>
                </li>

                <li className='flex items-center justify-around w-full text-xl text-center border  border-l-[#36735B] border-r-[#36735B]'>
                <p className='h-full w-full py-2 border-r border-r-[#36735B] border-b-[#36735B] text-[#36735B] font-medium'>999999</p>
                <p className='w-full h-full py-2 text-yellow-600'>使用中</p>
                </li>

                <li className='flex items-center justify-around w-full text-xl text-center border border-[#36735B] rounded-b-xl'>
                <p className='h-full w-full py-2 border-r border-r-[#36735B] border-b-[#36735B] text-[#36735B] font-medium'>999999</p>
                <p className='w-full h-full py-2 text-yellow-600'>使用中</p>
                </li>
                
            </div>
        </div>
    );
};

export default InUseStatusPage;