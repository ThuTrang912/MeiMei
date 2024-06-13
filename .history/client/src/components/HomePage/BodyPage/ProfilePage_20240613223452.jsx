import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from 'react-modal';
import API_BASE_URL from '../../../apiConfig';


const ProfilePage = () => {

  //show modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdateSuccess = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const history = useHistory()

  //get thông tin trên localstorage
  const userData = JSON.parse(localStorage.getItem('currentUser'));
  const idcard = userData.data.id_card;

  const http = axios.create({
    baseURL: `${API_BASE_URL}`,
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });

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
    if (data.user_name) {
      setUserName(data.user_name);
    }
    if (data.furigana) {
      setFurigana(data.furigana);
    }
    if (data.gender) {
      setGender(data.gender);
    }
    if (data.birthday) {
      setBirthday(data.birthday);
    }
    if (data.tel) {
      setTel(data.tel);
    }
    if (data.post_code) {
      setPostcode(data.post_code);
    }
    if (data.address) {
      setAddress(data.address);
    }
  }, [data.user_name, data.furigana, data.gender, data.birthday, data.tel, data.post_code, data.address]);

  const [user_name, setUserName] = useState([""]);
  const [furigana, setFurigana] = useState([""]);
  const [gender, setGender] = useState([""]);
  const [birthday, setBirthday] = useState([""]);
  const [tel, setTel] = useState([""]);
  const [post_code, setPostcode] = useState([""]);
  const [address, setAddress] = useState([""]);
  const [img_url, setImgUrl] = useState(undefined);
  //method get path_img
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgUrl(file);
  };

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
  const getNumericValue = (value) => {
    // Check if value is null or undefined
    if (value === null || value === undefined) {
      return ''; // Or you can handle it differently based on your requirements
    }
    // Loại bỏ tất cả các ký tự không phải số
    const numericValue = String(value).replace(/\D/g, '');

    return numericValue;
  };

  //call method updatedata de cap nhat du lieu tren api
  const Updatedata = async (id, e) => {
    e.preventDefault();
    try {
      const updatedDatas = new FormData();
      // updatedDatas.append("_method", "PUT");
      updatedDatas.append("user_name", user_name);
      updatedDatas.append("furigana", furigana);
      updatedDatas.append("birthday", birthday);
      updatedDatas.append("gender", gender);
      updatedDatas.append("tel", tel);
      updatedDatas.append("post_code", post_code);
      updatedDatas.append("address", address);
      updatedDatas.append("image", img_url);

      for (const [key, value] of updatedDatas.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Gửi dữ liệu bằng updatedDatas
      const csrf = await http.get("/sanctum/csrf-cookie");
      // });
      const update = await http.put(
        `${API_BASE_URL}/api/user/${idcard}`,
        updatedDatas
      );
      const user = await http.get(
        `${API_BASE_URL}/api/user/${idcard}`
      );
      const current = localStorage.setItem("currentUser", JSON.stringify(user)); // update localstorage
      setImgUrl(undefined)
      // console.log(response)
      if (update.status === 200) {
        console.log("Updated ProfilePage Successful");
        handleUpdateSuccess();
      } else {
        console.error('Lỗi', update.status);
      }

      // Chuyển hướng về trang chủ sau khi cập nhật thành công
      // history.push('/');
      // Làm mới trang để hiển thị dữ liệu mới
      // window.location.reload();

    } catch (error) {
      console.error("Lỗi:", error);
    }
  };


  //   }
  // };
  return (
    <div>
      <form onSubmit={(e) => Updatedata(idcard, e)}>
        <meta name="csrf-token" content="YOUR_CSRF_TOKEN_HERE"></meta>
        <ul className='relative flex flex-col items-start justify-center w-full h-auto p-5 text-base border-box'>
          <p className='ml-2 text-2xl font-bold text-[#0E3A36]'>個人情報</p>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box' onClose={() => setImgUrl(false)}>
            <label htmlFor="file-input" className="text-base">プロフィール写真</label>
            <input
              className='w-full h-12 p-1 text-base transition rounded-md outline-none duration-200s ManageFormInput'
              type="file"
              id="image"
              name='image'
              onChange={handleFileChange}
            />
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="kanjiName">氏名（漢字）</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='氏名（漢字）'
              type="text"
              id="user_name"
              name="user_name"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
            />
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="katakanaName">氏名（フリガナ）</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='氏名（フリガナ）'
              type="text"
              id="furigana"
              name="furigana"
              value={furigana}
              onChange={(e) => setFurigana(e.target.value)}
            />
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="birthdate">生年月日</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='生年月日'
              type="date"
              id="birthday"
              name="birthday"
              value={birthday} onChange={(e) => setBirthday(e.target.value)}
            />
          </li>
          <li className='flex items-center justify-between w-full p-1 m-1 border-b h-14 border-b-gray-500 border-b-solid border-box'>
            <label htmlFor="gender">性別</label><br />
            <input
              className='inline-block w-5 h-5 align-middle border border-gray-300 rounded-full appearance-none cursor-pointer checked:bg-green-300 checked:border-green-400 checked:shadow-md checked:shadow-green-300 hover:ring-2 hover:bg-green-300 hover:ring-green-400 checked:ring-2 checked:hover:ring-green-400 hover:shadow-md hover:shadow-green-300'
              type="radio"
              id="gender"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="gender">男性</label>
            <input
              className='inline-block w-5 h-5 align-middle border border-gray-300 rounded-full appearance-none cursor-pointer checked:bg-green-300 checked:border-green-400 checked:shadow-md checked:shadow-green-300 hover:ring-2 hover:bg-green-300 hover:ring-green-400 checked:ring-2 checked:hover:ring-green-400 hover:shadow-md hover:shadow-green-300'
              type="radio"
              id="gender"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="gender">女性</label><br />
            <input
              className='inline-block w-5 h-5 align-middle border border-gray-300 rounded-full appearance-none cursor-pointer checked:bg-green-300 checked:border-green-400 checked:shadow-md checked:shadow-green-300 hover:ring-2 hover:bg-green-300 hover:ring-green-400 checked:ring-2 checked:hover:ring-green-400 hover:shadow-md hover:shadow-green-300'
              type="radio"
              id="gender"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="gender">その他</label><br />
            {/* <input type="text" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} /> */}
          </li>
          {/* {phoneNumbers.map((phoneNumber, index) => ( */}
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="tel">電話番号</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='電話番号'
              maxLength={11}
              minLength={10}
              type="text"
              id="tel"
              name="tel"
              value={getNumericValue(tel)}
              onChange={(e) => setTel(e.target.value)}
            />
            {/* <button onClick={() => handleAddRemoveInput('phone', index, 'remove')}>-</button>
                {phoneNumbers.length - 1 === index && <button onClick={() => handleAddRemoveInput('phone', index, 'add')}>+</button>} */}
          </li>
          <li className='w-full h-full p-1 m-1 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="post_code">郵便番号</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='郵便番号'
              maxLength={8}
              minLength={8}
              type="text"
              id="post_code"
              name="post_code"
              value={formatPostcode(post_code)}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </li>
          <li className='w-full h-full p-1 m-1 mb-16 border-b border-b-gray-500 border-b-solid border-box'>
            {/* <label htmlFor="address">現在所</label> */}
            <input
              className='w-full h-12 p-1 text-xl transition border-none rounded-md duration-200s ManageFormInput'
              placeholder='現在所'
              type="text"
              id="address"
              name="address"
              value={address} onChange={(e) => setAddress(e.target.value)}
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

export default ProfilePage;