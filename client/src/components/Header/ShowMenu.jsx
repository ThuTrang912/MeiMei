import React, { useState } from 'react';
import './ShowMenu.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ShowMenu = () => {
    const [user, setUser] = useState(
        localStorage.hasOwnProperty("currentUser") === true
          ? JSON.parse(localStorage.getItem("currentUser"))
          : null
    );

    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("currentUser");
        setUser(null);
        window.location.href="/";
    }

    const  [showMenu ,setShowMenu] = useState(false);

    const toggleMenu = () =>{
        setShowMenu(!showMenu);
    }

    return (
        <div className='toggleMenuContainer'>
            <div className='image-container'>
                <img 
                className='image'
                src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center' 
                alt=''
                onClick={toggleMenu}
                />
            </div>
            {
                showMenu && (
                    <div className="menu">
                        <ul>
                            <li style={{borderBottom:'1px solid #ccc'}}>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                    <div className='image-container'>
                                        <Link to='/information' style={{ textDecoration: 'none',color:'black'}} >
                                            <img 
                                                className='image' 
                                                src='https://cdn.dribbble.com/users/2645/screenshots/197202/media/44b8a3db56f1f459e694118e36857c7e.png?resize=400x300&vertical=center' 
                                                alt='' 
                                            />
                                        </Link>
                                    </div>
                                    <div><b>UCHIHA ICTACHI</b></div>
                                </div>
                            </li>
                            <li>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                    <div><Link to='/updateData' style={{ textDecoration: 'none',color:'black'}}>データ更新</Link></div>
                                    <div className='image-icon'><img className='image' src='https://cdn-icons-png.flaticon.com/128/875/875100.png' alt='' /></div>
                                </div>
                            </li>
                            <li>
                                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                                    <div><p onClick ={handleLogout}>ログアウト</p></div>
                                    <div className='image-icon'><img className='image' src='https://cdn-icons-png.flaticon.com/128/10015/10015437.png' alt='' /></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
};

export default ShowMenu;