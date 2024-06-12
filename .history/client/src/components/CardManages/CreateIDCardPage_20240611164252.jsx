import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../apiConfig';

const CreateIDCardPage = () => {
    const [idCard, setIdCard] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Kiểm tra xem các trường nhập liệu đã được điền đầy đủ chưa
        if (!idCard || !role) {
            alert('IDと役割の情報を入力してください。');
            return;
        }

        try {
            // Gọi API để tạo một bản ghi mới trong bảng Manager
            const response = await axios.post(`http://${API_BASE_URL}:8000/api/manager`, {
                id_card: idCard,
                role: role
            });
            console.log('New ID card created:', response.data);
            alert('新しいIDカードが正常に登録されました。');
            // Xóa dữ liệu trong các trường nhập liệu sau khi đăng ký thành công
            setIdCard('');
            setRole('');
        } catch (error) {
            console.error('Error creating new ID card:', error);
            alert('IDカードの登録時にエラーが発生しました。');
        }
    };

    return (
        <div className='w-full h-full py-2'>
            <form className='flex flex-col items-center w-full h-full' onSubmit={handleSubmit}>
                <h1 className='text-[#36735B] text-xl mb-[5%]'>新規IDを作成します</h1>
                <input 
                    type='text'
                    value={idCard}
                    onChange={(e) => setIdCard(e.target.value)}
                    className='w-full py-3 text-2xl flex justify-center px-2 border border-[#36735B] text-[#36735B] rounded-xl bg-transparent outline-none mb-[15%] sm:mb-[10%] ManageFormInputId'
                    placeholder='カードID: 6ケタ'
                />

                <input 
                    type='text'
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className='w-full py-3 text-2xl flex justify-center px-2 border border-[#36735B] text-[#36735B] rounded-xl bg-transparent outline-none mb-[15%] sm:mb-[10%] ManageFormInputRole'
                    placeholder='役割: user'
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
