import React, { useState,useRef,useEffect } from 'react';
import { NavLink, Route, Switch, Redirect,Link } from 'react-router-dom/cjs/react-router-dom.min';
import CardStatusOverviewPage from './CardStatusOverviewPage';
import UnUsedStatusPage from './UnUsedStatusPage';
import InUseStatusPage from './InUseStatusPage';
import CreateIDCardPage from './CreateIDCardPage';

const CardManages = () => {

    const [currentPage, setCurrentPage] = useState('CardStatusOverviewPage');
    const [showMenuLogout,setShowMenuLogout] = useState(false);


    const toggleMenuLogout = () => {
        setShowMenuLogout(!showMenuLogout);
    }
    
    const handleNavigation = () => {
        // Xử lý khi chuyển hướng trang
        setShowMenuLogout(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Kiểm tra xem sự kiện click có xảy ra bên ngoài menu không
            if (showMenuLogout && !event.target.closest('.menuLogout')) {
                setShowMenuLogout(false);
            }
        };

        // Đăng ký hàm xử lý sự kiện click khi component được render
        document.addEventListener('click', handleOutsideClick);

        // Hủy đăng ký hàm xử lý sự kiện khi component unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showMenuLogout]);
    
    return (
        <div className='box-border relative flex flex-col items-center w-full h-screen py-[15%] sm:py-[5%]' style={{ backgroundImage: 'linear-gradient(#0E3A36,#00584A,#007758,#009860,#34A05F,#2E9059,#287F52,#0C844B,#047645,#185541,#13473B,#0E3A36)' }}>
            <div className='absolute top-0 right-0 h-24 menuLogout w-44 sm:w-52'>
                <img 
                    src='https://cdn-icons-png.flaticon.com/128/2311/2311524.png'
                    className='absolute w-7 top-3 right-1'
                    onClick={toggleMenuLogout}
                />
            </div>
            {showMenuLogout && (
                <Link to='/' className='absolute w-36 sm:w-44 py-3 flex justify-evenly items-center bg-[#D9D9D9] border border-gray-500 rounded-2xl top-10 right-4 font-bold'>
                    <p>ログアウト</p>
                    <img className='w-4' src='https://cdn-icons-png.flaticon.com/128/14090/14090275.png' alt='' />
                </Link>
            )}

            <p className='w-[80%] bg-[#D9D9D9] border border-[#0E3A36] rounded-3xl text-center text-[#0E3A36] font-bold text-3xl sm:text-2xl py-3 mb-[15%] sm:mb-[5%] sm:w-[46%]'>カード管理</p>
            
            <div className='relative w-[90%] sm:w-[50%] border border-[#0E3A36] rounded-2xl h-full'>
                {/* navigation */}
                <div className='flex items-center w-ful h-16 justify-evenly bg-[#36735B] border rounded-t-2xl border-[#ECFF8C] p-1.5 gap-2'>
                    <NavLink 
                        to='/cardManages/CardStatusOverviewPage' 
                        className="flex items-center justify-center w-full h-12 py-1 text-lg text-center text-white border border-transparent rounded-lg ManageFormInput"
                        style={{ backgroundColor: currentPage === 'CardStatusOverviewPage' ? '#68AE61' : 'transparent' }}
                        onClick={() => setCurrentPage('CardStatusOverviewPage')}
                    >
                        すべて
                    </NavLink>
                    
                    <NavLink 
                        to='/cardManages/UnUsedStatusPage'
                        className="flex items-center justify-center w-full h-12 py-1 text-lg text-center text-white border border-transparent rounded-lg ManageFormInput"
                        style={{ backgroundColor: currentPage === 'UnUsedStatusPage' ? '#68AE61' : 'transparent' }}
                        onClick={() => setCurrentPage('UnUsedStatusPage')}
                    >
                        未使用
                    </NavLink>
                    
                    <NavLink 
                        to='/cardManages/InUseStatusPage'
                        className="flex items-center justify-center w-full h-12 py-1 text-lg text-center text-white border border-transparent rounded-lg ManageFormInput"
                        style={{ backgroundColor: currentPage === 'InUseStatusPage' ? '#68AE61' : 'transparent' }}
                        onClick={() => setCurrentPage('InUseStatusPage')}
                    >
                        使用中
                    </NavLink>
                    
                    <NavLink 
                        to='/cardManages/CreateIDCardPage'
                        className="flex items-center justify-center w-full h-12 py-1 text-lg text-center text-white border border-transparent rounded-lg ManageFormInput"
                        style={{ backgroundColor: currentPage === 'CreateIDCardPage' ? '#68AE61' : 'transparent' }}
                        onClick={() => setCurrentPage('CreateIDCardPage')}
                    >
                        ID作成
                    </NavLink>

                </div>

                {/* body */}
                <div className='w-full h-[90%] bg-[#D9D9D9] p-2.5 border border-transparent rounded-b-2xl'>
                    <Switch>
                        <Route path="/cardManages/CardStatusOverviewPage"><CardStatusOverviewPage/></Route>
                        <Route path="/cardManages/UnUsedStatusPage"><UnUsedStatusPage /> </Route>
                        <Route path="/cardManages/InUseStatusPage"><InUseStatusPage/></Route>
                        <Route path="/cardManages/CreateIDCardPage"><CreateIDCardPage/></Route>
                        <Redirect to='/cardManages/CardStatusOverviewPage' />
                    </Switch>
                </div>

            </div>
        </div>
    );
};

export default CardManages;