import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from 'react-modal';
import API_BASE_URL from '../../../apiConfig';


const DescriptionPage = () => {

  //show modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdateSuccess = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const http = axios.create({
    baseURL: `http://${API_BASE_URL}:8000`,
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
    fetch(`http://${API_BASE_URL}:8000/api/user/${idcard}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);

  useEffect(() => {
    if (data.description) {
      setDescription(data.description);
    }
  }, [data.description]);

  const [description, setDescription] = useState([""]);
  const updateData = async (id, e) => {
    e.preventDefault();
    try {
      const updatedDatas = new FormData();
      updatedDatas.append("_method", "PUT");
      updatedDatas.append("description", description);

      for (const [key, value] of updatedDatas.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");
      // });
      const update = await http.post(
        `http://${API_BASE_URL}:8000/api/user/${idcard}`,
        updatedDatas
      );
      const user = await http.get(
        `http://${API_BASE_URL}:8000/api/user/${idcard}`
      );
      const current = localStorage.setItem("currentUser", JSON.stringify(user)); // update localstorage
      // console.log(response)
      if (update.status === 200) {
        console.log("Updated Description Successful");
        handleUpdateSuccess();
      } else {
        console.error('Lỗi', update.status);
      }

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  return (
    <div className='relative h-[540px] w-full p-5'>
      <form onSubmit={(e) => updateData(idcard, e)}>
        <p className='mb-5 ml-2 text-2xl font-bold text-[#0E3A36]'>私について</p>
          <textarea
            className='w-full h-auto p-2 ml-2 text-xl text-left bg-gray-100 border border-gray-400 rounded-lg outline-none ManageFormInput'
            rows="7"
            cols="30"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className='absolute flex items-center justify-center w-[67px] h-[57px] p-2 text-xl font-bold text-[#ECFF8C] border border-[#ECFF8C] rounded-full cursor-pointer right-2 bottom-2 ManageFormInput bg-gradient-to-tr from-[#08453D] to-[#478E5E]'
            id='btt' type='submit'
          >編集</button>
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

export default DescriptionPage;
