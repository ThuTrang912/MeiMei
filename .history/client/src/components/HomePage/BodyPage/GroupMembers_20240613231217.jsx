import { Link, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../apiConfig';

const GroupMembers = ({ searchTerm, onSearchChange }) => {
    const delete_group_btn = '/delete_group_btn.png';

    const [showGroupButton, setShowGroupButton] = useState(false);

    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const id_card = userData.data.id_card;

    const [data, setData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    // const [groupId, setGroupId] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSaved, setIsSaved] = useState();
    const [selectedGroupId, setSelectedGroupId] = useState(null); //group nao duoc chon
    // Thêm một sự kiện lắng nghe click ở ngoài menu để đóng menu
    const [menuVisibleList, setMenuVisibleList] = useState(Array(data.length).fill(false));
    const [isNewGroupVisible, setNewGroupVisible] = useState(Array(data.length).fill(false));
    const [deleteParentGroup, setdeleteParentGroup] = useState(Array(data.length).fill(false));
    const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

    const handleMenuClick = (e, index) => {
        e.preventDefault();
        e.stopPropagation();

        // Đóng menu trước đó nếu có
        if (openedMenuIndex !== null) {
            setMenuVisibleList((prevMenuList) => {
                const updatedMenuList = [...prevMenuList];
                updatedMenuList[openedMenuIndex] = false;
                return updatedMenuList;
            });

        }

        // Mở menu mới
        setMenuVisibleList((prevMenuList) => {
            const updatedMenuList = [...prevMenuList];
            updatedMenuList[index] = !updatedMenuList[index];
            return updatedMenuList;
        })
        // Cập nhật index của menu đang mở
        setOpenedMenuIndex(index);
    };

    // xoa group
    const handleDeleteParentGroup = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        setdeleteParentGroup((prevDeleteParentGroup) => {
            const deleteParentGroup = [...prevDeleteParentGroup];
            deleteParentGroup[index] = !deleteParentGroup[index];
            return deleteParentGroup;
        })
    }
    const handleCloseMenuClick = (e, index) => {
        const updatedMenuVisibleList = [...menuVisibleList];
        updatedMenuVisibleList[index] = false;
        setMenuVisibleList(updatedMenuVisibleList);

        const updatedisNewGroupVisible = [...isNewGroupVisible];
        updatedisNewGroupVisible[index] = false;
        setNewGroupVisible(updatedisNewGroupVisible);

        const deleteParentGroup_ = [...deleteParentGroup];
        deleteParentGroup_[index] = false;
        setdeleteParentGroup(deleteParentGroup_);

        // Đặt menu đang mở về null khi đóng
        setOpenedMenuIndex(null);
    }


    useEffect(() => {
        // setSearch(localStorage.getItem('searchTerm'));
        let apiUrl = `${API_BASE_URL}/api/groups/${id_card}/${currentPage}`;
        // Kiểm tra xem có từ khóa tìm kiếm không
        if (searchTerm) {
            apiUrl = `${API_BASE_URL}/api/group/${id_card}/${currentPage}/${searchTerm}`;

        }

        fetch(apiUrl)
            .then((response) => response.json())
            .then((apiData) => {
                setData(apiData.data);
                // setGroupId(data.group_id);
                setTotalPages(apiData.totalPages);
                console.log("groups: ", apiData.data);
                // console.log(groupId);
                // localStorage.setItem('searchTerm', "")
                // setSearch(localStorage.setItem('searchTerm', ""));
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    }, [currentPage, id_card, isSaved, searchTerm]);


    const handleClickGroup = (event, group_id) => {
        event.preventDefault();
        //event.stopPropagation();

        fetch(`${API_BASE_URL}/api/manage/${group_id}`)
            .then((response) => response.json())
            .then((apiData) => {
                setGroupData(apiData.data);
                setTotalPages(apiData.totalPages);
                // setIsSaved(group_id);
                setSelectedGroupId(group_id); // Lưu group_id vào state
                console.log("group members: ", apiData.data);
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    };

    //cách viết phần này của Recent và Following là khác nhau 
    const handleStarClick = (event, id_card, contact_id, group_id) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('click', contact_id);
        fetch(`${API_BASE_URL}/api/contact/like/${id_card}/${contact_id}`, {
            method: 'PUT',
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('like', responseData.data);
                setIsSaved(responseData.data.like);
                handleClickGroup(event, group_id);
            })
            .catch((error) => {
                console.error('like', error);
            });

    };

    const handleDeleteFollowerClick = async (e, index, group_id, id_card) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await fetch(`${API_BASE_URL}/api/manage/${group_id}/${id_card}`, {
                method: 'DELETE',
            });
            const responseData = await response.json();

            console.log('delete', responseData);
            setIsSaved(prevIsSaved => {
                // Sử dụng hàm callback để đảm bảo cập nhật đồng bộ và kích hoạt useEffect
                return !prevIsSaved;
            });
            handleCloseMenuClick(e, index);
        } catch (error) {
            console.error('delete', error);
        }

        handleClickGroup(e, group_id);
    };

    const handleDeleteGroupClick = async (e, index, group_id) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await fetch(`${API_BASE_URL}/api/group/${group_id}`, {
                method: 'DELETE',
            });
            const responseData = await response.json();

            console.log('delete', responseData);
            setIsSaved(prevIsSaved => {
                // Sử dụng hàm callback để đảm bảo cập nhật đồng bộ và kích hoạt useEffect
                return !prevIsSaved;
            });
            handleCloseMenuClick(e, index)
        } catch (error) {
            console.error('delete', error);
        }
    };

    const setImg = (e) => {
        // console.log(data.img_url)
        let placeHolderImg = "";
        let imgPath = `${API_BASE_URL}${e.img_url}`;
        // console.log(imgPath)
        if (e.user_name) {
            const nameSplit = e.user_name.split(" ");
            placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
        }
        return imgPath === `${API_BASE_URL}null` ? placeHolderImg : imgPath;

    }

    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        // Thông báo cho component rằng đã có sự thay đổi trong searchTerm
        onSearchChange(searchTerm);
    }, [searchTerm, onSearchChange, groupData]);


    return (
        <div className='relative flex flex-col w-full px-3 py-4 bg-white h-lhv border-box'>

            {/* dropdown button */}
            {/* dat map group o day */}
            {data.map((e, index) => (
                <div className='w-full my-1 max-h-full min-h-16 bg-[#D9D9D9]/10 rounded-md drop-shadow-md drop-shadow-gray-200 border border-[#D9D9D9]'
                    onClick={(event) => {
                        setShowGroupButton(true);
                        handleClickGroup(event, e.group_id);
                        setSelectedGroupId();
                    }}
                    onMouseLeave={(event) => {
                        setShowGroupButton(false);
                        handleCloseMenuClick(event, index);
                    }}
                // onMouseEnter={() => setGroupId(e.group_id)}
                >
                    <button className='relative w-full h-16 bg-[#D9D9D9]/50 rounded-md rounded-t-sm pl-3 text-lg text-left text-[#0E3A36] font-bold border border-gray-300'>
                        {e.group_name}

                        {/* xoa group */}
                        <img src={delete_group_btn} className="absolute w-2 h-4 transform -translate-y-1/2 top-1/2 right-1" onClick={(e) => handleDeleteParentGroup(e, index)} />
                        {deleteParentGroup[index] && (
                            <div className='absolute z-10 inline-flex flex-col w-40 h-auto px-1 text-xs bg-gray-100 border border-gray-300 rounded-md right-1 justify-evenly top-1 drop-shadow-md'>
                                <div className='inline-flex items-center justify-between px-1 py-2 m-1 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md' onClick={(event) => handleDeleteGroupClick(event, index, e.group_id)}>
                                    <p>削除</p>
                                    <img src='https://cdn-icons-png.flaticon.com/64/484/484662.png' className='w-3' />
                                </div>
                            </div>
                        )}
                    </button>

                    {showGroupButton && selectedGroupId === e.group_id && (
                        <ul className='flex flex-col items-center justify-center w-full max-h-full px-1 transition duration-200 ease-in-out min-h-20'>

                            {/* dat map list user o day */}
                            {groupData.map((e2, i) => (
                                <li className='relative flex items-center w-full h-14 pl-1.5 bg-gray-100 my-1 border rounded-lg border-gray-300 transition duration-200 cursor-pointer hover:bg-gray-200 hover:border-gray-200 hover:border hover:rounded-lg'>
                                    <Link key={e2.id_card} to={`/InformationPage/${id_card}/${e2.id_card}`} className='relative flex items-center w-3/5 p-1 bg-gray-300 border border-gray-300 rounded-lg h-4/5'>

                                        {/* set image,name,email */}
                                        <img src={setImg(e2)} className='mr-1 border border-gray-400 rounded-full w-7 h-7' alt='user avatar' />
                                        <div className='w-9/12 max-w-full overflow-hidden'>
                                            <p className='text-xs'><b>{e2.user_name}</b></p>
                                            <p className='text-xs text-gray-500'>{e2.email}</p>
                                        </div>
                                        {/* chinh sua nhom va so thich */}
                                        <div className='absolute right-1'>
                                            {/* <div onClick={(event) =>handleMenuClick(event, id_card, e.id_card)} className='text-left'> */}
                                            <img
                                                onClick={(event) => handleMenuClick(event, i)}
                                                className='w-3 pb-2'
                                                src='https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                                                alt=''
                                            />

                                            <div className={i} onClick={(event) => handleStarClick(event, id_card, e2.id_card, e.group_id)} style={{ width: '0.75rem' }}>
                                                {e2.like ? (
                                                    <img
                                                        className='w-3'
                                                        src='https://cdn-icons-png.flaticon.com/128/2377/2377810.png'
                                                        alt='save'
                                                    />
                                                ) : (
                                                    <img
                                                        className='w-3'
                                                        src='https://cdn-icons-png.flaticon.com/128/2377/2377878.png'
                                                        alt='nosave'
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='absolute right-1/2 sm:right-[41%] sm:top-[40%]'>
                                        {menuVisibleList[i] && (
                                            <div className='absolute z-10 inline-flex flex-col w-40 h-auto px-1 text-xs bg-gray-100 border border-gray-300 rounded-md left-5 justify-evenly top-1 drop-shadow-md'>
                                                <div className='inline-flex items-center justify-between px-1 py-2 m-1 text-left transition duration-200 ease-in-out hover:bg-gray-200 hover:border hover:border-gray-300 hover:rounded-md' onClick={(event) => handleDeleteFollowerClick(event, i, e2.group_id, e2.id_card)}>
                                                    <p>削除</p>
                                                    <img src='https://cdn-icons-png.flaticon.com/64/484/484662.png' className='w-3' />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className='absolute bottom-0 right-1 text-[11px] sm:text-xs text-gray-400'>{e2.created_at}</p>
                                </li>
                            ))}

                        </ul>
                    )}
                </div>
            ))
            }

            <div className='fixed bottom-0 flex items-center justify-center h-auto p-0.5 bg-gray-300 rounded-md w-full left-0'>
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className='hover:text-[#36735B] hover:cursor-pointer'>
                    前のページ
                </button>
                <span className='mx-4'>{currentPage}/{totalPages}</span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className='hover:text-[#36735B] hover:cursor-pointer'>
                    次のページ
                </button>
            </div>
        </div >
    );
};

export default GroupMembers;
