import React, { Fragment, useState } from 'react';
import './LoginPage.css';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";


const LoginPage = () => {
    const history = useHistory();
    const http = axios.create({
        baseURL: "http://localhost:8000",
    
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setLoading(true);
      const csrf = await http.get("/sanctum/csrf-cookie");
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
      setErrorMessage("メールアドレスかパスワードか間違っています");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }
    return (
        <Fragment>   
          {/* <div className='Border-me'> */}
          <div className='Container'>
            <div className='Border'>
                  <div className='Border-con'>
                    <div className='LoginBorder'>
                      <h2 className='FormHeader'>ログイン</h2>
                        <form onSubmit={handleLogin}>
                          <div className='LoginForm'>
                            <div className='FormGroup'>
                              <input
                                type="email"
                                className='FormInput'
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                //placeholder="meimei@gmail.com"
                                //required
                              />
                              <label for="email" className='Label'>メールアドレス</label>       
                              </div>
                              <div className='FormGroup'>
                                <input
                                 type="password"
                                 id="password"
                                 className='FormInput'
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 //placeholder="******"
                                 //required
                                />
                                <label for='password' className='Label'>パスワード</label>                    
                              </div>
                            </div>
                            <button className='LoginButton' type='submit'>ログイン</button><br />
                        </form>
                        <Link to="/signUpPage" className='CreateButton'>新規登録</Link><br />
                        {loading && (
                            <div role="status" className="pt-4 flex">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                         <br/>
                      {errorMessage && <div className="ErrorMessage">{errorMessage}</div>}
                    </div>
                    <div className='Appname'>
                      MeiMei
                    </div>
                  </div>
            </div>
          </div>
            {/* </div> */}         
        </Fragment>
    );
};

export default LoginPage;