import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from 'react-modal';
import API_BASE_URL from '../../../apiConfig';



const WorkInforPage = () => {

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

  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const idcard = userData.data.id_card;

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/company/${idcard}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
        // setComName(data.com_name);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
      });
  }, []);

  useEffect(() => {
    if (data.com_name) {
      setComName(data.com_name);
    }
    if (data.com_tel) {
      setComTel(data.com_tel);
    }
    if (data.com_fax) {
      setComFax(data.com_fax);
    }
    if (data.com_email) {
      setComEmail(data.com_email);
    }
    if (data.com_post_code) {
      setComPostCode(data.com_post_code);
    }
    if (data.department) {
      setDepartment(data.department);
    }
    if (data.com_address) {
      setComAddress(data.com_address);
    }
    if (data.position) {
      setPosition(data.position);
    }
    if (data.website) {
      setWebsite(data.website);
    }
  }, [data.com_name, data.com_tel, data.com_fax, data.com_email, data.com_post_code, data.com_address, data.department, data.position, data.website]);

  const [com_name, setComName] = useState([""]);
  const [com_tel, setComTel] = useState([""]);
  const [com_fax, setComFax] = useState([""]);
  const [com_email, setComEmail] = useState([""]);
  const [com_post_code, setComPostCode] = useState([""]);
  const [com_address, setComAddress] = useState([""]);
  const [department, setDepartment] = useState([""]);
  const [position, setPosition] = useState([""]);
  const [website, setWebsite] = useState([""]);

  // Hàm để xử lý định dạng mã bưu điện
  const formatPostcode = (value) => {
    // Check if value is null or undefined
    if (value === null || value === undefined) {
      return ''; // Or you can handle it differently based on your requirements
    }
    // Loại bỏ tất cả các ký tự không phải số
    const numericValue = String(value).replace(/\D/g, '');

    // Kiểm tra xem có đủ số để định dạng không
    if (numericValue.length >= 3) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
      return numericValue;
    }
  };
  const formatFax = (value) => {
    // Check if value is null or undefined
    if (value === null || value === undefined) {
      return ''; // Or you can handle it differently based on your requirements
    }
    // Loại bỏ tất cả các ký tự không phải số
    const numericValue = String(value).replace(/\D/g, '');

    // Kiểm tra xem có đủ số để định dạng không
    if (numericValue.length >= 3) {
      return `${numericValue.slice(0, 2)}-${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
    } else {
      return numericValue;
    }
  };
  const getNumericValue = (value) => {
    // Check if value is null or undefined
    if (value === null || value === undefined) {
      return ''; // Or you can handle it differently based on your requirements
    }
    // Loại bỏ tất cả các ký tự không phải số
    const numericValue = String(value).replace(/\D/g, '');

    return numericValue;
  };

  const updateData = async (id, e) => {
    e.preventDefault();
    try {
      const checkIdCardExistence = await http.get(
        `${API_BASE_URL}/api/company/${idcard}`
      );
      console.log(checkIdCardExistence);
      if (checkIdCardExistence.data.id_card) {
        console.log(checkIdCardExistence);
      } else {
        const companyId = new FormData();
        companyId.append("id_card", idcard);
        const addCompany = await http.post(
          `${API_BASE_URL}/api/company`,
          companyId
        );
        console.log("Added Company Id Successful");
      }

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("com_name", com_name);
      formData.append("com_tel", com_tel);
      formData.append("com_fax", com_fax);
      formData.append("com_email", com_email);
      formData.append("com_post_code", com_post_code);
      formData.append("com_address", com_address);
      formData.append("department", department);
      formData.append("position", position);
      formData.append("website", website);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");
      // });
      const update = await http.post(
        `${API_BASE_URL}/api/company/${idcard}`,
        formData
      );
      const company = await http.get(
        `${API_BASE_URL}/api/company/${idcard}`
      );
      // const current = localStorage.setItem("currentUser", JSON.stringify(user)); // update localstorage
      // console.log(response)
      if (update.status === 200) {
        console.log("Updated WorkInforPage Successful");
        handleUpdateSuccess();
      } else {
        console.error('Lỗi', update.status);
      }

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };




  return (
    <div>
      <form onSubmit={(e) => updateData(idcard, e)}>
        <ul className='relative flex flex-col items-start justify-center w-full h-auto p-5 text-base border-box'>
          <p className='ml-2 text-2xl font-bold text-[#0E3A36]'>勤務情報</p>

          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="kanjiName">会社名（漢字）</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='会社名（漢字）'
              type="text"
              id="com_name"
              name="com_name"
              value={com_name}
              onChange={(e) => setComName(e.target.value)}
              required
            />
          </li>
          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="katakanaName">会社名（フリガナ）</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='ウェブサイト'
              type="text"
              id="website"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </li>
          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="position">役職</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='部署'
              type="text"
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </li>
          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="position">役職</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='役職'
              type="text"
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}

            />
          </li>
          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="tel">電話番号</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='電話番号'
              maxLength={11}
              minLength={10}
              type="text"
              id="com_tel"
              name="com_tel"
              value={getNumericValue(com_tel)}
              onChange={(e) => setComTel(e.target.value)}
            />
            {/* <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
          {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>} */}
          </li>
          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="tel">電話番号</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='E-MAIL'
              type="mail"
              id="com_email"
              name="com_email"
              value={com_email}
              onChange={(e) => setComEmail(e.target.value)}
            />
            {/* <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
          {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>} */}
          </li>
          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="tel">電話番号</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='FAX'
              maxLength={12}
              minLength={12}
              type="fax"
              id="com_fax"
              name="com_fax"
              value={formatFax(com_fax)}
              onChange={(e) => setComFax(e.target.value)}
            />
            {/* <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
          {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>} */}
          </li>
          <li className='box-border w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid'>          {/* <label htmlFor="postalCode">郵便番号</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='郵便番号'
              maxLength={8}
              minLength={8}
              type="text"
              id="com_post_code"
              name="com_post_code"
              value={formatPostcode(com_post_code)}
              onChange={(e) => setComPostCode(e.target.value)}
            />
          </li>
          <li className='box-border w-full h-full p-1 m-1 mb-16 border-b border-b-gray-500 border-b-solid'>
            {/* <label htmlFor="currentAddress">現在所</label> */}
            <input
              className='w-full h-12 p-1 text-base transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='現在所'
              type="text"
              id="com_address"
              name="com_address"
              value={com_address}
              onChange={(e) => setComAddress(e.target.value)}
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

export default WorkInforPage;
