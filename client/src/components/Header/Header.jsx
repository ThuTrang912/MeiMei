import React , { useState } from 'react';
import './Header.css';
import ShowMenu from './ShowMenu';
import NotifiCation from './NotifiCation';

const Header = () => {

    const [showNotification, setShowNotification] = useState(false);

    const handleNotificationClick = () => {
        // Khi người dùng nhấn vào biểu tượng thông báo
        setShowNotification(true);
    };

    const handleNotificationClose = () => {
        // Khi người dùng nhấn vào ngoài hoặc nút đóng
        setShowNotification(false);
    };

    return (
        <div className='Header'>
            <div className='header-container'>
                <div className='logo'><img src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center'></img></div>
                <div className='grid-left'>
                    {/* scan */}
                    <div className='image-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',border:'1px solid black',width:'35px',height:'35px',top:'20%'}}>
                        <img 
                            style={{width:'70%'}} 
                            src='https://cdn-icons-png.flaticon.com/128/4379/4379661.png'
                            alt='scan'
                        />
                    </div>

                    {/* notification */}
                    <div className='image-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',border:'1px solid black',width:'35px',height:'35px',top:'20%'}}>
                        <img 
                            style={{width:'80%'}} 
                            src='https://cdn-icons-png.flaticon.com/128/3602/3602145.png'
                            alt='notification'
                            onClick={handleNotificationClick}
                        />
                    </div>

                    {/* account */}
                    <ShowMenu/>
                </div>
            </div>
            <div>{showNotification && <NotifiCation  onClose={handleNotificationClose}/>}</div> {/* Hiển thị Component Notification nếu showNotification là true */}
        </div>
    );
};

export default Header;
