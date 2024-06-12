import React, { useEffect, useState } from 'react';
import './NotifiCation.css';
import axios from 'axios';
import API_BASE_URL from '../../../apiConfig';

const NotifiCation = ({ onClose }) => {
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const id_card = user.id_card;
    const [newNotification, setNewNotification] = useState([]);
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const http = axios.create({
                    baseURL: `${API_BASE_URL}`,
                    headers: {
                        'X-Requested-with': 'XMLHttpRequest',
                    },
                    withCredentials: true,
                });

                // Fetching new notifications
                const responseNewNoti = await http.get(`/api/contact/newNotification/${id_card}`);
                setNewNotification(responseNewNoti.data.data);

                // Fetching historical notifications
                const responseNoti = await http.get(`/api/contact/notification/${id_card}`);
                setNotification(responseNoti.data.data.filter((notif) => !notif._));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id_card]);

    const setImg = (e) => {
       // console.log(data.img_url)
      let placeHolderImg = "";
      let imgPath = `${API_BASE_URL}${e.img_url}`;
      // console.log(imgPath)
      if (e.user_name) {
          const nameSplit = e.user_name.split(" ");
          placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
      }
      return imgPath === `${API_BASE_URL}null`? placeHolderImg: imgPath;
      
    }

    return (
        <div className='absolute z-20 w-10/12 max-w-full max-h-screen p-2 bg-gray-100 border border-gray-300 border-solid rounded-md shadow-md right-3 shadow-green-300 sm:w-96 min-h-64'>
            <div className='relative flex items-center p-2.5 m-3'>
                <div className='absolute top-0 left-0 text-xl font-bold cursor-pointer text-green-950'>通知</div>
                <div className='absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-gray-200 border border-gray-300 rounded-full hover:ring hover:ring-gray-300'>
                    <button className='text-xs font-bold cursor-pointer' onClick={onClose}>
                        X
                    </button>
                </div>
            </div>        
                
            {notification.map((e, index) => {
                const isNewNotification = index < newNotification.length ? true : false;

                return (
                    <div 
                        key={`notification-${index}`}
                        className={`list-none w-full rounded-md p-2 transition duration-200 cursor-pointer ${
                            isNewNotification ? 'bg-gray-200' : ''
                        } hover:bg-gray-200 hover:border hover:border-gray-200 hover:rounded-md mb-2`}
                    >
                        <NotificationItem notification={e} setImg={setImg} isNewNotification={isNewNotification} />
                    </div>
                );
            })}
            
        </div>
    );
};

// NotificationItem component
const NotificationItem = ({ notification, setImg, isNewNotification }) => (
    <div className={`list-none w-full rounded-md relative justify-start flex items-center p-1 mb-2 ${isNewNotification ? 'bg-gray-200' : ''}`}>
        <div className='flex items-center justify-center w-10 h-10 mr-2 border border-gray-300 border-solid rounded-full'>
            <img className='object-cover rounded-full w-9 h-9' src={setImg(notification)} alt='' />
        </div>
        <div className='w-10/12'>
            <div className='max-w-full text-sm break-all'>
                <b>{notification.user_name}</b>があなたをフォロー中です。
            </div>
            <div className='text-xs text-gray-500'>{notification.created_at}</div>
        </div>
    </div>
);


export default NotifiCation;