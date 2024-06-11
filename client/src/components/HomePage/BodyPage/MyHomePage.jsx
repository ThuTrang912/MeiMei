import { useParams } from 'react-router-dom';
import './MyHomePage.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import API_BASE_URL from '../../../apiConfig';


const MyHomePage = () => {
    const img1 ='/meimeilogo.png';
    
    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
    const { id_card, contact_id } = useParams();
    const [data, setData] = useState([]);
    const [company, setCompany] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const http = axios.create({
                    baseURL: `http://${API_BASE_URL}:8000`,
                    headers: {
                        "X-Requested-with": "XMLHttpRequest",
                    },
                    withCredentials: true,
                });

                // Ensure CSRF cookie is set
                await http.get("/sanctum/csrf-cookie");

                // Update the contact table if id_card and contact_id are different
                if (id_card !== contact_id) {
                    await http.put(`/api/contact/${id_card}/${contact_id}`);
                }

                // Fetch user data
                const response = await http.get(`/api/user/${contact_id}`);

                setData(response.data);
                // console.log(response.data.user_name);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, [id_card, contact_id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const http = axios.create({
                    baseURL: `http://${API_BASE_URL}:8000`,
                    headers: {
                        "X-Requested-with": "XMLHttpRequest",
                    },
                    withCredentials: true,
                });

                // Ensure CSRF cookie is set
                await http.get("/sanctum/csrf-cookie");

                // Update the contact table if id_card and contact_id are different
                if (id_card !== contact_id) {
                    await http.put(`/api/contact/${id_card}/${contact_id}`);
                }

                // Fetch user data
                const response = await http.get(`/api/company/${contact_id}`);
                setCompany(response.data);
                // console.log(response.data.com_name);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, [id_card, contact_id]);

    // console.log(data.img_url)
    let placeHolderImg = "";
    const imgPath = `http://${API_BASE_URL}:8000${data.img_url}`;
    // console.log(imgPath)
    if (data.user_name) {
        const nameSplit = data.user_name.split(" ");
        placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
    }
    return (
        // myhome-container
        <div className='max-w-sm mx-auto sm:max-w-2xl w-full h-3/4 absolute box-border flex flex-col items-center justify-center my-3.5 -translate-x-1/2 left-1/2'> 
            
            {/* <img src={img1} className='absolute top-[9%] sm:h-[47%] sm:-right-[45%] sm:top-[45%] h-28 right-[7%]'/> */}
            {/* myhomecard */}
            <div className='box-border relative flex items-center justify-center w-11/12 h-full border-4 border-solid border-emerald-800 sm:w-full sm:h-full rounded-xl max-h-80 sm:max-h-96'>
            <img src={img1} className='absolute -top-[50%] h-44 right-2 sm:h-64 sm:-right-[25%] sm:top-[45%] right-[7%]'/>
                {/* myhome-left */}
                <div className='box-border relative flex flex-col items-center float-left w-32 h-full rounded-l-lg bg-emerald-700 sm:w-96 justify-evenly '>
                    <li className='flex items-center justify-center w-16 h-16 border-2 border-white border-solid rounded-full sm:w-32 sm:h-32'>

                        {/* thay doi anh account tai day */}
                        <img
                            className='object-cover bg-white rounded-full w-14 h-14 sm:w-28 sm:h-28'
                            src={
                                imgPath === `http://${API_BASE_URL}:8000null`
                                    ? placeHolderImg
                                    : imgPath
                            }
                            alt='avatar' />
                    </li>
                    <li className='flex flex-col items-center justify-between w-full h-auto'>
                        {/* myhome-textname */}
                        <div className='flex items-center justify-center w-3/5 h-auto text-lg font-bold text-center text-white border-b-2 border-white border-solid sm:border-b-4 sm:text-2xl'>
                            {data.user_name}
                        </div>
                        <div className='mt-2.5'>
                            <p className='text-sm font-bold text-center text-white break-all sm:text-xl'>{company.department}</p>
                            <p className='text-sm font-bold text-center text-white break-all sm:text-xl'>{company.position}</p>
                        </div>

                    </li>
                    <li className='flex flex-col items-center justify-center'>
                        <img
                            className='-rotate-90 w-14 h-14 sm:w-24 sm:h-24'
                            src='https://cdn-icons-png.flaticon.com/64/6357/6357872.png' alt=''
                        />
                    </li>
                </div>
                {/* myhome-right */}
                <div className='relative flex flex-col items-center justify-center w-full h-full pt-4 bg-white rounded-l-none rounded-r-lg'>
                    <ul className='flex flex-col items-center justify-between w-11/12 h-full'>
                        {/* myhome-right-title */}

                        <div className='flex items-center justify-center w-full h-16 text-lg font-bold border-2 border-[#002019] sm:text-4xl sm:h-24 rounded-xl text-[#002019] break-all text-center'>
                            {company.com_name}
                        </div>

                        {/* email */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/546/546394.png' alt='' />
                                <p className='max-w-full break-words'>{data.email}</p>
                                {/* {data.email} */}
                            </div>
                        </li>
                        {/*website  */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/900/900782.png' alt='' />
                                <p className='max-w-full break-words'>{company.website}</p>
                            </div>
                        </li>
                        {/* tel */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/159/159832.png' alt='' />
                                {company.com_tel}
                            </div>
                        </li>
                        {/* address */}
                        <li className='w-full pl-2.5'>
                            <div className='p-2.5 flex justify-start items-center text-sm sm:text-base'>
                                <img
                                    className='w-5 sm:w-6 mr-1.5'
                                    src='https://cdn-icons-png.flaticon.com/128/927/927667.png' alt='' />
                                {company.com_address}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default MyHomePage;