import React from 'react';

const CreateIDCardPage = () => {
    return (
        <div className='w-full h-full py-2'>
            
            <form className='flex flex-col items-center w-full h-full'>
                <h1 className='text-[#36735B] text-xl mb-[5%]'>新規IDを作成します</h1>
                <input 
                    type='text'
                    className='w-full py-3 text-2xl flex justify-center px-2 border border-[#36735B] text-[#36735B] rounded-xl bg-transparent outline-none mb-[15%] sm:mb-[10%] ManageFormInput'
                />

                <button 
                    type='submit'
                    className='w-[83px] h-[45px] rounded-[30px] border border-[#0E3A36] bg-[#36735B] text-white font-bold text-[20px] ManageFormInput'
                >
                登録
                </button>
            </form>
        </div>
    );
};

export default CreateIDCardPage;