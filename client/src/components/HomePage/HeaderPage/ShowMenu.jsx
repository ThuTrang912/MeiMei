import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Link, Switch, Route } from 'react-router-dom';
import './ShowMenu.css';
import { useAuth } from '../../AuthContext';
import API_BASE_URL from '../../../apiConfig';

const ShowMenu = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const id_card = userData.data.id_card;
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/user/${id_card}`)
            .then((response) => response.json())
            .then((apiData) => {
                setData(apiData);
                //console.log(apiData.id_card)   code kiem tra id hien tai
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
            });
    }, []);
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("currentUser");
        window.location.href = "/";
    }

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleNavigation = () => {
        // Xử lý khi chuyển hướng trang
        toggleMenu(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Kiểm tra xem sự kiện click có xảy ra bên ngoài menu không
            if (showMenu && !event.target.closest('.show-menu')) {
                setShowMenu(false);
            }
        };

        // Đăng ký hàm xử lý sự kiện click khi component được render
        document.addEventListener('click', handleOutsideClick);

        // Hủy đăng ký hàm xử lý sự kiện khi component unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showMenu]);

    let placeHolderImg = "";
    const imgPath = `${API_BASE_URL}${data.img_url}`;
    // console.log(imgPath)
    if (data.user_name) {
        const nameSplit = data.user_name.split(" ");
        placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
    }

    return (
        <div className='show-menu'>
            {/* toggleMenuContainer */}
            <div className='flex items-center justify-center w-auto h-auto overflow-hidden transition duration-200 bg-white rounded-full cursor-pointer show-menu hover:bg-gray-200 hover:shadow-md hover:shadow-green-300 hover:rounded-full hover:ring-2 hover:ring-green-500'>
                {/* set ảnh account của bản thân */}
                {/* toggleMenuContainer-image */}
                <div className='flex items-center justify-center w-10 h-10 overflow-hidden border border-white border-solid rounded-full cursor-pointer'>
                    <img
                        className='object-cover w-full h-full rounded-full'
                        src={
                            imgPath === `${API_BASE_URL}null`
                                ? placeHolderImg
                                : imgPath
                        }
                        alt='avatar'
                        onClick={toggleMenu}
                    />
                </div>
                {showMenu && (
                    <div className='absolute z-10 h-auto p-4 bg-gray-100 border border-gray-300 border-solid rounded-md shadow-md right-3 top-20 none w-80 shadow-green-300'>
                        <ul className='p-0 m-3 list-none'>
                            {/* Menu items */}
                            <li onClick={handleNavigation}>
                                {/* menuImage */}
                                <Link to={`/InformationPage/${id_card}/${id_card}`} className='flex items-center justify-around w-full h-full p-4 mb-2 transition duration-200 bg-gray-100 border-b cursor-pointer rounded-t-md border-b-solid border-b-gray-400 : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md'>
                                    {/* ảnh account */}
                                    <div className='flex items-center justify-center border border-gray-400 border-solid rounded-full w-14 h-14'>
                                        <img className='object-cover w-12 h-12 rounded-full'
                                            src={
                                                imgPath === `${API_BASE_URL}null`
                                                    ? placeHolderImg
                                                    : imgPath
                                            }
                                            alt='avatar' />

                                    </div>
                                    <div className='ml-3 text-lg font-bold text-green-950'><b>{data.user_name}</b></div>
                                </Link>
                            </li>
                            <li onClick={handleNavigation}>
                                <Link
                                    className='flex items-center justify-between w-full h-full p-4 mb-2 transition duration-200 bg-gray-100 rounded-md cursor-pointer text-green-950 : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md'
                                    to="/ManageAccount"
                                >
                                    アカウントを管理
                                    <div className='flex items-center justify-center w-6 h-6'><img className='object-cover w-full h-full' src='https://cdn-icons-png.flaticon.com/128/3524/3524636.png' alt='' /></div>
                                </Link>
                            </li>
                            <li className='flex items-center justify-between p-4 mb-2 transition duration-200 bg-gray-100 rounded-md cursor-pointer : hover:border :hover:border-solid hover:border-gray-200 hover:bg-gray-200 hover:rounded-md' onClick={handleLogout}>
                                <p>ログアウト</p>
                                <div className='flex items-center justify-center w-6 h-6'><img className='object-cover w-full h-full' src='https://cdn-icons-png.flaticon.com/128/14090/14090275.png' alt='' /></div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowMenu;
