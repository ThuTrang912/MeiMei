import React, { useState } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search';
import RecentAccounts from './RecentAccounts';
import Following from './Following';
import GroupMembers from './GroupMembers';
import './ContactPage.css';
import FavoritePage from './FavoritePage';


const ContactPage = () => {
    const img1 ='/meimei_img.png';
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const [currentPage, setCurrentPage] = useState('Following');

    return (
        // contact-container
        <div className='box-border w-full p-4'>
            {/* <img src={img1} className='fixed z-10 mb-1 h-14'/> */}
            {/* contact-search */}
            <div className='relative flex items-center justify-end w-full h-full mb-4'>
                <img src={img1} className='absolute h-24 mb-1 -left-5 '/>
                <Search onSearch={handleSearchChange} />
            </div>
            {/* section */}
            <div className='relative flex items-center justify-center w-full bg-[#36735B] rounded rounded-b h-14 rounded-t-3xl border border-[#ECFF8C]'>
                <NavLink
                    className="flex items-center justify-center float-left w-full p-2 m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/Following"
                    style={{ backgroundColor: currentPage === 'Following' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('Following')}
                >
                    フォロー中
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full p-2 m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/RecentAccounts"
                    style={{ backgroundColor: currentPage === 'RecentAccounts' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('RecentAccounts')}
                >
                    最近見たアカウント
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full  m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/GroupMembers"
                    style={{ backgroundColor: currentPage === 'GroupMembers' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('GroupMembers')}
                >
                    グループ
                </NavLink>
                <NavLink
                    className="flex items-center justify-center float-left w-full  m-2 text-xs font-bold text-white transition-colors duration-1000 border-transparent underline-none rounded-2xl  h-4/5 hover:bg-[#68AE61] hover:border-2 hover:border-[#68AE61] hover:rounded-2xl hover:shadow hover:shadow-[#7db578]"
                    to="/ContactPage/FavoritePage"
                    style={{ backgroundColor: currentPage === 'FavoritePage' ? '#68AE61' : 'transparent' }}
                    onClick={() => setCurrentPage('FavoritePage')}
                >
                    お気に入り
                </NavLink>
            </div>
            {/* card */}
            <div className='relative w-full h-screen bg-white border border-l-[#0B3E38] border-r-[#0B3E38] border-bt-[#0B3E38]'>
                <Switch>
                    <Route path="/ContactPage/RecentAccounts"><RecentAccounts searchTerm={searchTerm} onSearchChange={handleSearchChange} /></Route>
                    <Route path="/ContactPage/Following"><Following searchTerm={searchTerm} onSearchChange={handleSearchChange} /></Route>
                    <Route path="/ContactPage/GroupMembers"><GroupMembers searchTerm={searchTerm} onSearchChange={handleSearchChange} /></Route>
                    <Route path='/ContactPage/FavoritePage'><FavoritePage searchTerm={searchTerm} onSearchChange={handleSearchChange} /></Route>
                    <Redirect to='/ContactPage/Following' />
                </Switch>
            </div>
        </div>
    );
};

export default ContactPage;