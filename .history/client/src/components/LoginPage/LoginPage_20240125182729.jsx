import React, { Fragment, useEffect, useState } from 'react';
import './LoginPage.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import API_BASE_URL from '../../apiConfig';


const img = 'meimei_login_img.png';
const LoginPage = () => {
  const history = useHistory();
  const http = axios.create({
    baseURL: `http://${API_BASE_URL}:8000`,

    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },

    withCredentials: true,
  });

  //handle Login
  const [user, setUser] = useState(
    localStorage.hasOwnProperty("currentUser") === true
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //code xác nhận xem có dữ liệu trên storage k! nếu mà có sẽ tự đông đăng nhập
  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      history.push(`/main/${userFromLocalStorage.data.id_card}`);
      // Tự động đăng nhập người dùng ở đây
    }
  }, []); // useEffect chỉ chạy một lần sau khi component được tạo ra
  const handleNavigation = () => {
    history.push('/signUpPage'); // Điều hướng đến trang SignUpPage
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      // if (email === "admin@gmail.com") {
      //   console.log(email);
      //   history.push('/cardManages');
      //   return;
      // }

      setErrorMessage("");
    setLoading(true);
    const csrf = await http.get("/sanctum/csrf-cookie");
    const login = await http.post("/api/login", {
      email: email,
      password: password,
    });

    const userRole = login.data.role; // Lấy vai trò từ dữ liệu trả về
    if (userRole === 'admin') {
      history.push('/adminDashboard'); // Điều hướng đến trang dashboard của admin
    } else {
      const current = localStorage.setItem(
        "currentUser",
        JSON.stringify(login)
      );
      setUser(login);
      const userFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
      history.push(`/main/${userFromLocalStorage.data.id_card}`);
    }
    console.log("dang nhap thanh cong",)
    } catch (error) {
      setErrorMessage("メールアドレスかパスワードか間違っています");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }

  }
  return (
    <Fragment>
      {/* <div className='Border-me'> */}
      <div className='box-border flex flex-col items-center justify-around w-full h-full py-7'style={{ backgroundImage: 'linear-gradient(#0E3A36,#00584A,#007758,#009860,#34A05F,#2E9059,#287F52,#0C844B,#047645,#185541,#13473B,#0E3A36)' }}>
        <div className='flex items-center justify-around w-full h-36 sm:px-[30%]'>
            <img src={img} alt='' className='w-32 h-32 border border-white rounded-full' />
            <h1 className='text-4xl font-bold text-white sm:text-5xl'>MEIMEI</h1>
        </div> 
        <br/>           
        <div className='relative w-10/12 sm:w-96 h-auto p-5 bg-white border border-[#ECFF8C] border-solid shadow-md rounded-2xl shadow-[#ECFF8C]'>
          <h2 className='p-2 text-3xl font-bold text-center border-b border-gray-300 text-[#0E3A36] border-b-solid'>ログイン</h2>
          
          <form onSubmit={handleLogin}>
            <div className='mt-4 LoginForm'>
              <div className='pt-3 mt-2 mb-2 FormGroup'>
                <input
                  type="text"
                  className='mb-2 text-xl FormInput'
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // placeholder="meimei@gmail.com"
                  required
                />
                <label for="text" className='Label'>メールアドレス</label>
              </div>
              <div className='pt-3 FormGroup'>
                <input
                  type="password"
                  id="password"
                  className='FormInput'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // placeholder="******"
                  required
                />
                <label for='password' className='Label'>パスワード</label>
              </div>
            </div>
            <br />
            <button className='w-full px-1 py-3 text-white font-bold text-xl rounded-lg bg-[#36735B] hover:bg-[#36735B]/90 FormButton' type='submit'>ログイン</button>
          </form>
          {/* <br /> 
          <button className='rounded-lg CreateButton' onClick={handleNavigation}>新規登録</button>
          <br /> */}
          {loading && (
            <div role="status" className="flex pt-4 ml-2">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
              <p>Loading...</p>
            </div>

          )}
          {/* <br /> */}
          {errorMessage && <div className="mt-5 text-red-600">{errorMessage}</div>}
        </div>
        <br/>
        {/* dang ki bang google va twitter */}
        <div className='w-full px-7 sm:pl-[39%] sm:mt-2'>
            <div className='flex items-center mb-2'>
                <img src='https://cdn-icons-png.flaticon.com/64/300/300221.png' className='w-5 mr-1'/>
                <a href='#' className='text-lg text-white hover:text-blue-800 hover:border-b hover:border-blue-800'>Googleアカウントでログイン</a>
            </div>
            <div className='flex items-center'>
                <img src='https://cdn-icons-png.flaticon.com/64/5969/5969020.png' className='w-5 mr-1'/>
                <a href='#' className='text-lg text-white hover:text-blue-800 hover:border-b hover:border-blue-800'>X(Twitter)アカウントでログイン</a>
            </div>
        </div>
        <br/>
        <h3 className='text-[#ECFF8C] font-bold text-xl ml-60 sm:ml-[15%] hover:border-b hover:border-[#ECFF8C]' onClick={handleNavigation}>新規登録</h3>
      </div>
      
      
    </Fragment>
  );
};

export default LoginPage;