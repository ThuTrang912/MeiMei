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
                const response = await axios.get(`http://${API_BASE_URL}:8000/api/manager/status`);
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

    const displayCardStatusList = cardStatusList
        .slice(pageNumber * cardsPerPage, (pageNumber + 1) * cardsPerPage)
        .map((item, index) => (
            <li key={index} className='flex items-center justify-around w-full text-xl text-center border border-[#36735B] rounded-xl'>
                <p className='h-full w-full py-2 border-r border-r-[#36735B] border-b-[#36735B] text-[#36735B] font-medium'>{item.id}</p>
                <p className={`w-full h-full py-2 ${item.status === '未使用' ? 'text-red-600' : 'text-yellow-600'}`}>{item.status}</p>
            </li>
        ));

    return (
        <div className='box-border w-full h-full'>
            <div className='flex w-full text-[#36735B] font-bold text-2xl mb-[5%]'>
                <p className='grid w-full grid-cols-1 text-center'>ID</p>
                <p className='grid w-full grid-cols-1 text-center'>状況</p>
            </div>

            <div className='w-full'>
                {displayCardStatusList}
            </div>

            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination flex justify-center mt-4'}
                activeClassName={'bg-blue-500 text-white border-blue-500'}
                previousLinkClassName={'border rounded-l p-2 border-gray-300'}
                nextLinkClassName={'border rounded-r p-2 border-gray-300'}
                pageClassName={'border rounded-full p-2 border-gray-300 mx-1'}
                breakClassName={'border p-2 border-transparent mx-1'}
                disabledClassName={'opacity-50 cursor-not-allowed'}
            />
        </div>
    );
};

export default CardStatusOverviewPage;

