import React, { useState, useEffect } from 'react';
import ShowMenu from './ShowMenu';
import NotifiCation from './NotifiCation';
import './Header.css';
import axios from "axios";
import API_BASE_URL from '../../../apiConfig';

const Header = () => {
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const id_card = user.id_card;
    const [showNotification, setShowNotification] = useState(false);
    const [notificationCount, setNotificationCount] = useState(); // Set the initial count to 1 for demonstration
    const [notification, setNotification] = useState();
    const [newNotification, setNewNotification] = useState();

    useEffect(() => {
    const fetchData = async () => {
        try {
            const http = axios.create({
                baseURL: `${API_BASE_URL}`,
                headers: {
                    "X-Requested-with": "XMLHttpRequest",
                },
                withCredentials: true,
            });

            const response = await http.get(`/api/contact/newNotification/${id_card}`);
            
            //lấy số thông báo
            setNotificationCount(response.data.newNotificationCount);
            // console.log("header - NotificationCount: " + response.data.newNotificationCount);
            
            //lấy new notification
            setNewNotification(response.data.data);
            // console.log("header - newNotification " + JSON.stringify(response.data.data));

        } catch (error) {
            console.error("Error:", error);
        }
    };

    fetchData();
}, [id_card]);


  const handleNotificationClick = () => {
    const fetchData = async () => {
            try {
                const http = axios.create({
                    baseURL: `${API_BASE_URL}`,
                    headers: {
                        "X-Requested-with": "XMLHttpRequest",
                    },
                    withCredentials: true,
                });

                // Ensure CSRF cookie is set
                await http.get("/sanctum/csrf-cookie");
                
                //vừa set notification thành false và trả về newFollower để có màu khác khi hiển thị
                await http.put(`/api/contact/notification/${id_card}`);
                setNotificationCount(0);
                console.log("header - newNotification turn to False " + notificationCount);
                // await http.put(`/api/contact/follower/${id_card}`);
                
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
        setShowNotification(true);
  };

  const handleNotificationClose = () => {
    // When the user clicks outside or on the close button
    setShowNotification(false);
  };

  return (
    <div className='relative w-full h-20 px-4 border-box'>
      {/* header-container */}
      <div className='flex items-center justify-between w-full h-full'>
        {/* header-text */}
        <div className='float-left text-4xl pl-2.5 font-bold text-white'>MEIMEI</div>
        <div className='relative p-2.5 flex justify-center items-center'>
          {/* notification */}
          {notificationCount > 0 && (
            <div className='absolute flex items-center justify-center w-5 h-5 text-black font-bold text-sm bg-[#DD5252] border border-[#0E3A36] border-solid rounded-full top-2 left-9'>
              {notificationCount}
            </div>
          )}
          <div className='flex items-center justify-center mr-4 overflow-hidden transition duration-200 bg-[#FFFFFF]/90 border border-white border-solid rounded-full cursor-pointer h-9 w-9 2-8 hover:shadow-md hover:shadow-green-400 hover:bg-green-200 hover:ring hover:ring-green-400'>
            <img
              className='object-cover w-6 h-6'
              src='https://cdn-icons-png.flaticon.com/64/601/601025.png'
              alt='notification'
              onClick={handleNotificationClick}
            />
          </div>

          {/* account */}
          <div>
            <ShowMenu />
          </div>
        </div>
      </div>
      <div>{showNotification && <NotifiCation onClose={handleNotificationClose} />}</div> {/* Display Notification Component if showNotification is true */}
    </div>
  );
};

export default Header;