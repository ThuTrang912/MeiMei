import { Link, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./RecentAccounts.css"
import API_BASE_URL from '../../../apiConfig';

const RecentAccounts = ({ searchTerm, onSearchChange }) => {
    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const id_card = userData.data.id_card;
    const [data, setData] = useState([]);
    // const search = localStorage.getItem('searchTerm');
    // console.log(search);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSaved, setIsSaved] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // let apiUrl = `http://${API_BASE_URL}:8000/api/contact/recent/${id_card}/${currentPage}`;
                let response = await fetch(`http://${API_BASE_URL}:8000/api/contact/recent/${id_card}/${currentPage}`);
                // Kiểm tra xem có từ khóa tìm kiếm không
                if (searchTerm) {
                    response = await fetch(`http://${API_BASE_URL}:8000/api/contact/${id_card}/${currentPage}/${searchTerm}`);
                }
                const apiData = await response.json();

                setData(apiData.data);
                setTotalPages(apiData.totalPages);
                // console.log(apiData.data);

            } catch (error) {
                console.error('Lỗi khi gửi yêu cầu:', error);
            }
        };
        fetchData();
    }, [currentPage, id_card, isSaved, searchTerm]);

    //cách viết phần này của Recent và Following là khác nhau   
    const handleStarClick = async (event, id_card, contact_id) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const response = await fetch(`http://${API_BASE_URL}:8000/api/contact/like/${id_card}/${contact_id}`, {
                method: 'PUT',
            });
            const responseData = await response.json();

            console.log('like', responseData);
            setIsSaved(prevIsSaved => {
                // Sử dụng hàm callback để đảm bảo cập nhật đồng bộ và kích hoạt useEffect
                return !prevIsSaved;
            });
        } catch (error) {
            console.error('like', error);
        }
    };


    // const [isSaved, setIsSaved] = useState(false);

    // const toggleSaved = () => {
    //     setIsSaved(!isSaved);
    // };
    const setImg = (e) => {
        // console.log(data.img_url)
        let placeHolderImg = "";
        let imgPath = `http://${API_BASE_URL}:8000${e.img_url}`;
        // console.log(imgPath)
        if (e.user_name) {
            const nameSplit = e.user_name.split(" ");
            placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
        }
        return imgPath === `http://${API_BASE_URL}:8000null` ? placeHolderImg : imgPath;

    }

    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        // Thông báo cho component rằng đã có sự thay đổi trong searchTerm
        onSearchChange(searchTerm);
    }, [searchTerm, onSearchChange]);

    return (
        <div>
            <div className='border-box relative w-full h-lhv p-2.5 flex flex-col'>
                {data.map((e, index) => (
                    <div className='show-menu relative flex items-center w-full h-16 pl-1.5 bg-gray-100 my-1 border rounded-lg border-gray-300 transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-lg'>

                        {/* item-border */}
                        <Link to={`/InformationPage/${id_card}/${e.id_card}`} className='relative flex items-center w-3/5 p-1 bg-gray-300 border border-gray-300 rounded-lg h-4/5'>
                            {/* image-container */}
                            <div className='flex items-center justify-center mr-1 rounded-full w-7 h-7'>
                                <img
                                    className='object-cover w-full h-full border border-gray-400 border-solid rounded-full'
                                    src={setImg(e)}
                                    alt=''
                                />
                            </div>
                            <div className='w-9/12 max-w-full overflow-hidden'>
                                <div className='text-xs'><b>{e.user_name}</b></div>
                                <div className='text-xs text-gray-500'>{e.email}</div>
                            </div>

                            {/* chinh sua nhom va so thich */}
                            <div className='absolute top-7 right-1'>
                                {/* set ảnh được đánh dấu sao va không được đánh dấu sao */}
                                <div onClick={(event) => handleStarClick(event, id_card, e.id_card)} className='w-3'>
                                    {e.like ? (
                                        <img
                                            className=' 3'
                                            src='https://cdn-icons-png.flaticon.com/128/2377/2377810.png'
                                            alt='save'
                                        />
                                    ) : (
                                        <img
                                            className=' 3'
                                            src='https://cdn-icons-png.flaticon.com/128/2377/2377878.png'
                                            alt='nosave'
                                        />
                                    )}
                                </div>
                            </div>
                        </Link>

                        {/* set thoi gian */}
                        <div className='absolute bottom-0 text-xs text-gray-400 right-1'>{e.contact_updated_at}</div>
                    </div>
                ))}
            </div>

            <div className='fixed bottom-0 flex items-center justify-center w-full left-0 h-auto p-0.5 bg-gray-300 rounded-md'>
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className='hover:text-[#36735B] hover:cursor-pointer'>
                    前のページ
                </button>
                <span className='mx-4'>{currentPage}/{totalPages}</span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className='hover:text-[#36735B] hover:cursor-pointer'>
                    次のページ
                </button>
            </div>


        </div>


    );
};

export default RecentAccounts;