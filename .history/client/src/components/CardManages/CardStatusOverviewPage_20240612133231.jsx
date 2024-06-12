import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import API_BASE_URL from '../../apiConfig';

const CardStatusOverviewPage = () => {
    const [cardStatusList, setCardStatusList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const cardsPerPage = 10; // Number of items to display per page

    useEffect(() => {
        const fetchCardStatus = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/manager/status`);
                setCardStatusList(response.data);
            } catch (error) {
                console.error('Error fetching card status:', error);
            }
        };

        fetchCardStatus();
    }, []);

    const pageCount = Math.ceil(cardStatusList.length / cardsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // Inside the displayCardStatusList variable definition
    const displayCardStatusList = cardStatusList
        .slice(pageNumber * cardsPerPage, (pageNumber + 1) * cardsPerPage)
        .map((item, index) => (
            <li key={index} className='flex items-center justify-around w-full text-xl text-center border border-[#36735B] rounded-xl'>
                <p className='h-full w-full py-2 border-r border-r-[#36735B] border-b-[#36735B] text-[#36735B] font-medium'>{item.id}</p>
                <p className={`w-full h-full py-2 ${item.status === '未使用' ? 'text-red-600' : 'text-yellow-600'}`}>{item.status}</p>
                <p className='w-full h-full py-2'>{item.role}</p> 
            </li>
        ));

    return (
        <div className='box-border w-full h-full'>
            <div className='flex w-full text-[#36735B] font-bold text-2xl mb-[5%]'>
                <p className='grid w-full grid-cols-1 text-center'>ID</p>
                <p className='grid w-full grid-cols-1 text-center'>状況</p>
                <p className='grid w-full grid-cols-1 text-center'>役割</p>
            </div>

            <div className='w-full'>
                {displayCardStatusList}
            </div>

            <div className="fixed bottom-0 flex items-center justify-center w-full left-0 h-auto p-0.5 bg-gray-300 rounded-md">
                <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 0} className='hover:text-[#36735B] hover:cursor-pointer'>
                    Previous
                </button>
                <span className='mx-4'>{pageNumber + 1}/{pageCount}</span>
                <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === pageCount - 1} className='hover:text-[#36735B] hover:cursor-pointer'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CardStatusOverviewPage;
