import React, { useState } from 'react';
import SetTimes from './SetTimes';
import GenderTheme from './GenderTheme';
import '../SignUpPage/SignUpPage.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import bcrypt from 'bcryptjs';


const SignUpPage = () => {
    const http = axios.create({
        baseURL: "http://localhost:8000",
    
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

    const [idCardErrorMessage, setIdCardErrorMessage] = useState('');
    const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [genderErrorMessage, setGenderErrorMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (email === "" || password === "" || userName === "" || gender === "" || idCard === "") {
            if (email === "") {
                setEmailErrorMessage('メールアドレスを入力してください');
            }
            if (password === "") {
                setPasswordErrorMessage('パスワードを入力してください');
            }
            if (userName === "") {
                setUserNameErrorMessage('名前を入力してください');
            }
            if (idCard === "") {
                setIdCardErrorMessage('IDカードを入力してください');
            }
            if (gender === "") {
                setGenderErrorMessage('性別を選んでください');
            }
            return;
        }
        
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("id_card", idCard);
            formData.append("user_name", userName);
            formData.append("birthday", birthYear + "-" + birthMonth + "-" + birthDay);
            formData.append("gender", gender);
            formData.append("email", email);
            formData.append("password", await bcrypt.hash(password, 10));
      
            for (const [key, value] of formData.entries()) {
              console.log(`${key}: ${value}`);
            }
            const csrf = await http.get("/sanctum/csrf-cookie");
            const register = await http.post(
              "http://localhost:8000/api/user",
              formData
            );
            console.log("Registration successful", register);
      
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
            history.push('/main');
            console.log("dang nhap thanh cong")
        } catch (error) {
            // setEmailErrorMessage("");
            // setPasswordErrorMessage("");
            // setUserNameErrorMessage("");
            // setIdCardErrorMessage("");
            // setGenderErrorMessage("");
            console.error("Register failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='Container'>
            <div className='SignUpBorder'>
                <h2 className='FormHeader'>新規登録</h2>
                <form onSubmit={handleSignup}>
                    <div className='SignUpForm'>
                        <div className='FormGroup'>
                            <label className='FormLabel'>ID CARD</label>
                            <input
                                type="text"
                                className='FormInput'
                                value={idCard}
                                onChange={(e) => setIdCard(e.target.value)}
                                placeholder="123456"
                            />
                            {idCardErrorMessage && <p className='FormError'>{idCardErrorMessage}</p>}
                        </div>
                        <div className='FormGroup'>
                            <label className='FormLabel'>NAME</label>
                            <input
                                type="text"
                                className='FormInput'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="MeiMei"
                            />
                            {userNameErrorMessage && <p className='FormError'>{userNameErrorMessage}</p>}
                        </div>
                        <div className='FormGroup'>
                            <label className='FormLabel'>メールアドレス</label>
                            <input
                                type="email"
                                className='FormInput'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="meimei@gmail.com"
                            />
                            {emailErrorMessage && <p className='FormError'>{emailErrorMessage}</p>}
                        </div>
                        <div className='FormGroup'>
                            <label className='FormLabel'>パスワード</label>
                            <input
                                type="password"
                                className='FormInput'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                            />
                            {passwordErrorMessage && <p className='FormError'>{passwordErrorMessage}</p>}
                        </div>
                        
                        <SetTimes
                            setCurrentMonth={setBirthMonth}
                            setCurrentDay={setBirthDay}
                            setCurrentYear={setBirthYear}
                        />

                        <div className='FormGroup'>
                            <GenderTheme setSelectedOption={setGender}></GenderTheme>
                            {genderErrorMessage && <p className='FormError'>{genderErrorMessage}</p>}
                        </div>
                    </div>
                    <br/>
                    <button className='FormButton' type='submit'>新規登録</button><br />
                </form>
                <Link to="/loginPage" className='FormButton'>ログイン</Link>
                {loading && (
                  <div role="status" className="pt-4 flex">
                      <span className="sr-only">Loading...</span>
                  </div>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;
