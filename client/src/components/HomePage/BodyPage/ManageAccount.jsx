import React, { useState } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import './ManageAccount.css'
import ProfilePage from './ProfilePage';
import WorkInforPage from './WorkInforPage';
import SocialMediaPage from './SocialMediaPage';
import DescriptionPage from './DescriptionPage';
import MyHomePage from './MyHomePage';
import API_BASE_URL from '../../../apiConfig';

const ManageAccount = () => {
    const [currentPage, setCurrentPage] = useState('ProfilePage');
    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        // manageAccount-container
        <div className='box-border relative flex flex-row w-screen h-auto max-w-full px-2 py-4 sm:p-5 '>
            {/* vertical-nav */}
            {/* <div className='left-0 border-box absolute top-3 mr-4/6 p-2.5 w-1/6 h-auto ml-8 bg-white rounded-md z-10'> */}
            
            {/*  vertical-nav-inline*/}
            <div className='absolute flex flex-col items-center justify-between w-[20%] h-auto bg-[#36735B] border border-[#ECFF8C]/60 rounded-lg sm:w-32 left-0.5 -translate-y-1/3 top-1/3'>
                {/* manageAccount-section */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'ProfilePage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border rounded-full border-[#0E3A36] w-14 h-14 ManageFormInput'
                    style={{ 
                        backgroundColor: currentPage === 'ProfilePage' ? '#ECFF8C' : '#ECE9E9',
                        opacity : currentPage === 'ProfilePage' ? '0.9' : '1' ,
                        borderColor: currentPage === 'ProfilePage' ? 'rgb(34 197 94)':'',
                        }}
                    to="/ManageAccount/ProfilePage"
                    onClick={() => setCurrentPage('ProfilePage')}
                >

                    {/* thay doi anh account */}
                    <img
                        className='object-cover w-8 m-2'
                        src='https://cdn-icons-png.flaticon.com/128/456/456212.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/* manageAccount-section */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'WorkInforPage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border rounded-full border-[#0E3A36] w-14 h-14 ManageFormInput'
                    style={{ 
                        backgroundColor: currentPage === 'WorkInforPage' ? '#ECFF8C' : '#ECE9E9',
                        opacity : currentPage === 'WorkInforPage' ? '0.9' : '1' ,
                        borderColor: currentPage === 'WorkInforPage' ? 'rgb(34 197 94)':'',
                        }}
                    to="/ManageAccount/WorkInforPage"
                    onClick={() => setCurrentPage('WorkInforPage')}
                >
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/639/639394.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/*manageAccount-section  */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'SocialMediaPage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border rounded-full border-[#0E3A36] w-14 h-14 ManageFormInput'
                    style={{ 
                        backgroundColor: currentPage === 'SocialMediaPage' ? '#ECFF8C' : '#ECE9E9',
                        opacity : currentPage === 'SocialMediaPage' ? '0.9' : '1' ,
                        borderColor: currentPage === 'SocialMediaPage' ? 'rgb(34 197 94)':'',
                        }}
                    to="/ManageAccount/SocialMediaPage"
                    onClick={() => setCurrentPage('SocialMediaPage')}
                >
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/900/900782.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/*manageAccount-section  */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'DescriptionPage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border rounded-full border-[#0E3A36] w-14 h-14 ManageFormInput'
                    style={{ 
                        backgroundColor: currentPage === 'DescriptionPage' ? '#ECFF8C' : '#ECE9E9',
                        opacity : currentPage === 'DescriptionPage' ? '0.9' : '1' ,
                        borderColor: currentPage === 'DescriptionPage' ? 'rgb(34 197 94)':'',
                        }}
                    to="/ManageAccount/DescriptionPage"
                    onClick={() => setCurrentPage('DescriptionPage')}
                >
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/12454/12454226.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
                {/*manageAccount-section  */}
                {/* <div className='flex items-center justify-center w-20 h-20 rounded-full' style={{ backgroundColor: currentPage === 'MyHomePage' ? 'white' : 'transparent' }}> */}
                <NavLink
                    className='flex items-center justify-center m-5 border rounded-full border-[#0E3A36] w-14 h-14 ManageFormInput'
                    style={{ 
                        backgroundColor: currentPage === 'MyHomePage' ? '#ECFF8C' : '#ECE9E9',
                        opacity : currentPage === 'MyHomePage' ? '0.9' : '1' ,
                        borderColor: currentPage === 'MyHomePage' ? 'rgb(34 197 94)':'',
                        }}
                    to="/MyHomePage"
                    onClick={() => { setCurrentPage('MyHomePage'); handleReloadPage(); }}>
                    <img
                        className='object-cover w-8'
                        src='https://cdn-icons-png.flaticon.com/128/1946/1946488.png'
                        alt=''
                    />
                </NavLink>
                {/* </div> */}
            </div>
            {/* </div> */}

            {/* manageAccount-card */}
            <div className='box-border flex items-center justify-center w-screen h-auto mb-12 bg-white border border-[#0B3E38] rounded-lg'>
                {/* flex-left */}
                <div className='w-2/12 sm:w-32'></div>
                <div className='w-full h-full'>
                    <Switch>
                        <Route path='/ManageAccount/ProfilePage'><ProfilePage /></Route>
                        <Route path='/ManageAccount/WorkInforPage'><WorkInforPage /></Route>
                        <Route path='/ManageAccount/SocialMediaPage'><SocialMediaPage /></Route>
                        <Route path='/ManageAccount/DescriptionPage'><DescriptionPage /></Route>
                        <Redirect to='/ManageAccount/ProfilePage' />
                    </Switch>
                </div>
            </div>
            {/* <div className='absolute bottom-0 h-20 w-28'>
                <button className='flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-green-200 border-2 border-green-400 border-solid rounded-md cursor-pointer focus:shadow-md shadow-green-400 hover:shadow-green-400 active:shadow-green-400' 
                    id='btt' type='submit'
                >編集</button>
            </div> */}
        </div>
    );
};

export default ManageAccount;