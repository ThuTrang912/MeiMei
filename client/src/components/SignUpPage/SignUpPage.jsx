import React, { useState } from 'react';
import SetTimes from './SetTimes';
import GenderTheme from './GenderTheme';
import './SignUpPage.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import bcrypt from 'bcryptjs';
import API_BASE_URL from '../../apiConfig';

const img = 'meimei_login_img.png';
const SignUpPage = () => {
    const http = axios.create({
        baseURL: `${API_BASE_URL}`,

        headers: {
            "X-Requested-with": "XMLHttpRequest",
        },
        withCredentials: true,
    });

    const [user, setUser] = useState(
        localStorage.hasOwnProperty("currentUser") === true
            ? JSON.parse(localStorage.getItem("currentUser"))
            : null
    );
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [idCard, setIdCard] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [idErrorMessage, setIdErrorMessage] = useState('');
    const [genderErrorMessage, setGenderErrorMessage] = useState('');

    const checkIdExists = async () => {
        try {
            const response = await http.get(`/api/user/is_registration_allowed/${idCard}`);
            return response.data.exists;
        } catch (error) {
            console.error('Error checking ID existence:', error);
            return false;
        }
    };

    const checkRegistrationAllowed = async () => {
        try {
            const response = await http.get(`/api/user/is_registration_allowed/${idCard}`);
            return response.data.registration_allowed;
        } catch (error) {
            console.error('Error checking Registration allowed:', error);
            return false;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            setIdErrorMessage("");
            setErrorMessage("");
            setGenderErrorMessage("");
            setLoading(true);
            //kiem tra id co phai la so khong
            if (!/^[1-9]\d*$/.test(idCard)) {
                setIdErrorMessage("IDカードは0で始まることか数字ではないことか登録できません");
                return;
            }

            // Check if ID exists
            const idExists = await checkIdExists();
            console.log('idExistsssss',idExists);
            if (!idExists) {
                setErrorMessage('IDカードが存在していません');
                return;
            }
            
            // Check if registration allowed
            const isRegistrationAllowed = await checkRegistrationAllowed();
            console.log('isRegistrationAllowed',isRegistrationAllowed);
            if (!isRegistrationAllowed) {
                setErrorMessage('IDカードが既に登録しています');
                return;
            }

             // Kiểm tra xem gender có được chọn hay không
            if (!gender) {
                setGenderErrorMessage("性別を選択してください");
                return;
            }

            const formData = new FormData();
            formData.append("id_card", idCard);
            formData.append("user_name", userName);
            formData.append("birthday", birthYear + "-" + birthMonth + "-" + birthDay);
            formData.append("gender", gender);
            formData.append("email", email);
            formData.append("password", await bcrypt.hash(password, 10));
            //formData.append("password", password);
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const csrf = await http.get("/sanctum/csrf-cookie");
            const register = await http.post(
                `${API_BASE_URL}/api/user`,
                formData
            );
            console.log("Registration successful:", register.data);
            // console.log(user.data.id_card);

            //login after register
            const login = await http.post("/api/login", {
                email: email,
                password: password,
            });
            const current = localStorage.setItem(
                "currentUser",
                JSON.stringify(login)
            );
            setUser(login);
            history.push(`/main/${idCard}`);
            console.log("dang nhap thanh cong")
        } catch (error) {
            setErrorMessage("IDカードかメールアドレスか既に登録しています");
            console.error("Register failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='box-border flex flex-col items-center justify-around w-full h-full py-7'style={{ backgroundImage: 'linear-gradient(#0E3A36,#00584A,#007758,#009860,#34A05F,#2E9059,#287F52,#0C844B,#047645,#185541,#13473B,#0E3A36)' }}>
        <div className='flex items-center justify-around w-full h-36 sm:px-[30%]'>
                <img src={img} alt='' className='w-32 h-32 border border-white rounded-full' />
                <h1 className='text-4xl font-bold text-white sm:text-5xl'>MEIMEI</h1>
            </div> 
            <br/>           
            <div className='relative w-10/12 h-auto p-5 bg-white border border-[#ECFF8C] border-solid shadow-md rounded-2xl shadow-[#ECFF8C] sm:w-96'> 
                <h2 className='p-2 text-3xl font-bold text-center border-b border-gray-300 text-[#0E3A36] border-b-solid'>新規登録</h2>

                <form onSubmit={handleSignup}>
                    <ul className='w-full h-full p-2 mt-3'>
                        <li className='pt-2 FormGroup'>
                            <input
                                type="text"
                                maxLength={6}
                                minLength={6}
                                // style={{ width: '40%' }}
                                className='mb-2 FormInput'
                                id='text'
                                value={idCard} 
                                onChange={(e) => setIdCard(e.target.value)}
                                // placeholder="123456"
                                required
                            />
                            <label htmlFor="text" className='ml-1 Label-sign p-1.5'>ID カード</label>
                        </li>
                        <li className='pt-4 FormGroup'>
                            <input
                                type="text"
                                className='mb-2 FormInput'
                                id='name'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                // placeholder="MeiMei"
                                required
                            />
                            <label htmlFor="text" className='Label-sign p-1.5'>名前</label>
                        </li>
                        <li className='pt-4 FormGroup'>
                            <input
                                type="email"
                                className='mb-2 FormInput'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor='email' className='Label-sign p-1.5'>メールアドレス</label>
                        </li>
                        <li className='pt-4 FormGroup'>
                            <input
                                type="password"
                                className='mb-2 FormInput'
                                id='pass'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="pass" className='Label-sign p-1.5'>パスワード</label>
                        </li>
                        <li className='settime'>
                            <SetTimes
                                setCurrentYear={setBirthYear}
                                setCurrentMonth={setBirthMonth}
                                setCurrentDay={setBirthDay}
                            />
                        </li>
                        <li>
                            <GenderTheme setSelectedOption={setGender}></GenderTheme>
                        </li>

                        <br/>
                        <button className='w-full px-1 py-2 text-white font-bold text-xl rounded-lg bg-[#36735B] hover:bg-[#36735B]/90 FormButton' type='submit'>新規登録</button>
                    </ul>
                </form>
                {errorMessage && <div className="ml-2 ErrorMessage">{errorMessage}</div>}
                {idErrorMessage && <div className="ml-2 ErrorMessage">{idErrorMessage}</div>}
                {genderErrorMessage && <div className="ml-2 ErrorMessage">{genderErrorMessage}</div>}
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
            </div>
            <br/>
            <Link to='/' className='text-[#ECFF8C] font-bold text-xl ml-60 hover:border-b hover:border-[#ECFF8C] sm:ml-[15%]'>ログイン</Link>
        </div>
    );
};

export default SignUpPage;