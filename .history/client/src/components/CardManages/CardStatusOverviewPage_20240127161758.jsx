import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardStatusOverviewPage = () => {
    const [cardStatusList, setCardStatusList] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách ID và trạng thái tương ứng
        axios.get('/api/manager/status')
            .then(response => {
                setCardStatusList(response.data);
            })
            .catch(error => {
                console.error('Error fetching card status:', error);
            });
    }, []);

    return (
        <div className='box-border w-full h-full'>
            <div className='flex w-full text-[#36735B] font-bold text-2xl mb-[5%]'>
                <p className='grid w-full grid-cols-1 text-center'>ID</p>
                <p className='grid w-full grid-cols-1 text-center'>状況</p>
            </div>

            <div className='w-full'>
                {/* Mapping qua danh sách cardStatusList để hiển thị từng ID và trạng thái */}
                {cardStatusList.map((item, index) => (
                    <li key={index} className='flex items-center justify-around w-full text-xl text-center border border-[#36735B] rounded-xl'>
                        <p className='h-full w-full py-2 border-r border-r-[#36735B] border-b-[#36735B] text-[#36735B] font-medium'>{item.id}</p>
                        <p className={`w-full h-full py-2 ${item.status === '未使用' ? 'text-red-600' : 'text-yellow-600'}`}>{item.status}</p>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default CardStatusOverviewPage;
