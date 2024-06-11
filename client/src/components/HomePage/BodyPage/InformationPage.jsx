import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import API_BASE_URL from '../../../apiConfig';
import axios from "axios";


const InformationPage = () => {
    const { id_card, contact_id } = useParams();
    // Truy cập dữ liệu người dùng đã lưu trữ sau khi đăng nhập
    const user = JSON.parse(localStorage.getItem('currentUser')).data;
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
                console.log(response.data.user_name);
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
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();

    }, [id_card, contact_id]);

    let placeHolderImg = "";
    const imgPath = `http://${API_BASE_URL}:8000${data.img_url}`;
    // console.log(imgPath)
    if (data.user_name) {
        const nameSplit = data.user_name.split(" ");
        placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`;
    }

    const myDivRef_com = useRef();
    const myDivRef_account = useRef();
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollToDiv = () => {
        // console.log("Scrolling...");
        // const pageHeight = document.documentElement.scrollHeight;
        const pageHeight = window.screen.height
        if (isScrolled) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // const scrollPercentage = 0.01; // Adjust this value as needed
            // const scrollToPosition = pageHeight * scrollPercentage;

            window.scrollTo({
                top: pageHeight,
                behavior: 'smooth'
            });
        }
        setIsScrolled(!isScrolled);
    };

    return (
        <div className='box-border w-full h-full p-2.5 mt-5 overflow-auto rounded-3xl'>
            <div className='flex flex-col items-start justify-center w-full p-6'>
                {/* account image and name */}
                <div className='flex items-center justify-start'>
                    <img
                        className='object-cover w-20 h-20 mr-10 border-2 border-white rounded-full'
                        src={
                            imgPath === `http://${API_BASE_URL}:8000null`
                                ? placeHolderImg
                                : imgPath
                        }
                        alt='avatar'
                    />
                    <div className='flex flex-col items-start justify-center'>
                        {/* フリガナ */}
                        <p className='text-sm text-[#FFFFFF]/80'>{data.furigana}</p>
                        {/* 名前 */}
                        <div className='flex items-center justify-center'>
                            <p className='mr-2 text-2xl font-bold text-[#FFFFFF]'>{data.user_name}</p>
                            {/* icon for gender */}
                            <img

                                className='w-5 h-5'
                                // male
                                src={
                                    data.gender === 'male'
                                        ? 'https://cdn-icons-png.flaticon.com/128/949/949822.png'
                                        // female
                                        : data.gender === 'female'
                                            ? 'https://cdn-icons-png.flaticon.com/128/949/949823.png'
                                            // other
                                            : 'https://cdn-icons-png.flaticon.com/128/5730/5730444.png'
                                }
                                alt=''
                            />
                        </div>
                        {/* birthday */}
                        <p className='text-sm text-[#FFFFFF]/80'>{data.birthday}</p>
                    </div>
                </div>
                <ul className='mt-4'>
                    <li className='py-1 text-xl text-[#FFFFFF] break-all'>{data.email}</li>
                    <li className='py-1 text-xl text-[#FFFFFF]'>{data.tel}</li>
                    <li className='py-1 text-xl text-[#FFFFFF]'>〒{data.post_code} - {data.address}</li>
                    <li className='py-1 text-xl text-[#FFFFFF]'>Instagram: {data.instagram}</li>
                    <li className='py-1 text-xl text-[#FFFFFF]'>X(Twitter): {data.x}</li>
                </ul>
            </div>

            {/* company */}
            <div className='absolute flex flex-col justify-center items-center w-full top-11/12 sm:top-[81%] left-1/2 p-7 transform -translate-x-1/2 bg-[#FFFFFF] rounded-3xl border border-[#ECFF8C] shadow shadow-[#36735Bs]'>
                {/* <div className={`absolute left-1/2 w-4 h-2 transform -translate-x-1/2 bg-[#0E3A36] clip-triangle ${isScrolled ? 'rotate-0' : 'rotate-180'}`}  onClick={scrollToDiv} /> */}
                <button className={`${isScrolled ? 'rotate-0' : 'rotate-180'}`} onClick={scrollToDiv}>
                    <img src='https://cdn-icons-png.flaticon.com/128/10412/10412527.png' className='w-6 h-4' />
                </button>
                {/* company */}
                <div className='relative w-full h-full'>
                    <p className='text-2xl font-bold text-[#0E3A36] mb-2'>勤務先</p>
                    <ul className='relative w-full h-full pl-2'>
                        <div className='absolute w-full max-h-full border-l h-[90%] bottom-5 border-l-gray-400 z-999 left-4 border-l-solid'></div>
                        <li className='flex items-center h-12 mb-1'><div className='z-10 w-4 h-4 mr-4 bg-[#0E3A36]/90 rounded-full'></div><p className='w-10/12'>{company.com_name}</p></li>
                        <li className='flex items-center h-12 mb-1'><div className='z-10 w-4 h-4 mr-4 bg-[#0E3A36]/90 rounded-full'></div><p className='w-10/12'>住所: 〒{company.com_post_code} - {company.com_address}</p></li>
                        <li className='flex items-center h-12 mb-1'><div className='z-10 w-4 h-4 mr-4 bg-[#0E3A36]/90 rounded-full'></div>電話番号: {company.com_tel}</li>
                        <li className='flex items-center h-12 mb-1'><div className='z-10 w-4 h-4 mr-4 bg-[#0E3A36]/90 rounded-full'></div>FAX: {company.com_fax}</li>
                        <li className='flex items-center h-12 mb-1'><div className='z-10 w-4 h-4 mr-4 bg-[#0E3A36]/90 rounded-full'></div><p className='w-10/12 break-all'>Email: {company.com_email}</p></li>
                        <li className='flex items-center h-12 mb-1'><div className='z-10 w-4 h-4 mr-4 bg-[#0E3A36]/90 rounded-full'></div><p className='w-10/12 break-all'>Website: {company.website}</p></li>
                        <li className='flex items-center h-12 mb-1'><div className='z-10 w-4 h-4 mr-4 bg-[#0E3A36]/90 rounded-full'></div>
                            <span>
                                {company.department}
                            </span>
                            <span className='px-2'> - </span>
                            <span>{company.position}</span>
                        </li>
                    </ul>
                </div>

                {/* about me */}
                <div className='w-full'>
                    <p className='text-xl font-bold text-[#0E3A36]'>私について</p>
                    <ul className='w-full py-2 break-all'>
                        <li>{data.description}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InformationPage;