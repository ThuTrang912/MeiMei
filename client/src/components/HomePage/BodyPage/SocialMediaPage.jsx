import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./SocialMediaPage.css";
import Modal from 'react-modal';
import API_BASE_URL from '../../../apiConfig';


const SocialMediaPage = () => {

  //show modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdateSuccess = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const http = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  //get thông tin trên localstorage
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const idcard = userData.data.id_card;

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/user/${idcard}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);

  useEffect(() => {
    if (data.instagram) {
      setInstagram(data.instagram);
    }
    if (data.x) {
      setX(data.x);
    }
  }, [data.instagram, data.x]);


  const [instagram, setInstagram] = useState([""]);
  const [x, setX] = useState([""]);
  const updateData = async (id, e) => {
    e.preventDefault();
    try {
      const updatedDatas = new FormData();
      updatedDatas.append("_method", "PUT");
      updatedDatas.append("instagram", instagram);
      updatedDatas.append("x", x);

      for (const [key, value] of updatedDatas.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");
      // });
      const update = await http.post(
        `${API_BASE_URL}/api/user/${idcard}`,
        updatedDatas
      );
      const user = await http.get(
        `${API_BASE_URL}/api/user/${idcard}`
      );
      const current = localStorage.setItem("currentUser", JSON.stringify(user)); // update localstorage
      // console.log(response)
      if (update.status === 200) {
        console.log("Updated SocialMediaPage Successful");
        handleUpdateSuccess();
      } else {
        console.error('Lỗi', update.status);
      }

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className='relative w-full h-[540px]'>
      <form onSubmit={(e) => updateData(idcard, e)}>
        <ul className='box-border flex flex-col justify-center w-full h-full p-5'>
          <p className='mb-5 ml-2 text-2xl font-bold text-[#0E3A36]'>ソーシャルメディア</p>
          <li className='box-border flex items-center w-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            <img className='w-8 mr-2' src='https://cdn-icons-png.flaticon.com/128/725/725372.png' alt='' />
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              // style={{
              //   backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/725/725372.png')",
              //   backgroundSize: "30px", // Đặt kích thước ảnh
              //   backgroundPosition: "left center", // Đặt vị trí ảnh
              //   backgroundRepeat: "no-repeat", // Ngăn chặn lặp lại ảnh
              // }}
              type='text'
              id="x"
              name="x"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </li>
          <li className='box-border flex items-center w-full p-1 m-1 mb-64 border-b border-b-gray-500 border-b-solid'>
            <img className='w-8 mr-2' src='https://cdn-icons-png.flaticon.com/128/4406/4406253.png' alt='' />
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              // style={{
              //   backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/4406/4406253.png')",
              //   backgroundSize: "30px", // Đặt kích thước ảnh
              //   backgroundPosition: "left center", // Đặt vị trí ảnh
              //   backgroundRepeat: "no-repeat", // Ngăn chặn lặp lại ảnh
              // }} 
              type='text'
              id="instagram" name="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </li>
          <button className='absolute flex items-center justify-center w-[67px] h-[57px] p-2 text-xl font-bold text-[#ECFF8C] border border-[#ECFF8C] rounded-full cursor-pointer right-2 bottom-2 ManageFormInput bg-gradient-to-tr from-[#08453D] to-[#478E5E]'
            id='btt' type='submit'
          >編集</button>
        </ul>
      </form>

      <Modal
        isOpen={isModalOpen}
        contentLabel="Update Success Modal"
        className="fixed z-20 inline-block w-64 h-20 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <div className="flex items-center justify-center w-full h-full p-4 mb-4 text-sm text-green-600 bg-green-200 rounded-lg " role="alert">
          <span className="mr-1 text-sm font-medium">Updated Successful</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <button className='absolute right-2 bottom-1' onClick={closeModal}>OK</button>
        </div>
      </Modal>
    </div>
  );
};


export default SocialMediaPage;
