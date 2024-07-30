import React, { useContext } from 'react'
import * as config from '../utilities/config'
import * as SessionMsg from './SwalSessionExpire'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../context/GlobalStateProvider';




const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { setUserType } = useContext(GlobalContext);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    const inputEmailHandler = (e) => {
        setEmail(e.target.value);  
    }

    const inputPasswordHandler = (e) => {  
        setPassword(e.target.value);
    }


    const loginHandler = () => {

        if(email === '')
        {
            toastError('email cannot be empty');
            return false;
        }

        if(password === '')
        {
            toastError('password cannot be empty');
            return false;
        }

        const postData = new FormData();
        postData.append('email', email);
        postData.append('password', password);
        // postData.append('flag', flag);

        console.log(postData);
        checkLogin(postData);
    }




    const toastError = (data) => {
        toast.error(data, {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


    async function checkLogin(postData)
    {
        try{
            const response = await axios.post(config.API_URL+'login',postData);

            console.log(response.data);
            
            const responseCode = response.data.split('<@_@>')[0];
            //stringify JSON array
            const responseData = response.data.split('<@_@>')[1];

            const authKey = response.data.split('<@_@>')[2];

            const loginType = response.data.split('<@_@>')[3];
            // console.log(responseCode);
            // console.log(responseData); 

            if(responseCode == 'LOGIN_SUCCESS')
            {
                if(loginType == 'T')
                {
                    // alert('Login Successfull'+response.data);
                    navigate('/dashboard');
                    localStorage.setItem('isLoggedIn',true);
                    localStorage.setItem('loginType','T');
                    localStorage.setItem('adminId',responseData);
                    localStorage.setItem('authKey',authKey);
                    setUserType('T');
                    
                    console.log(authKey);
                    
                }
                else if(loginType == 'S')
                {
                    // alert('Login Successfull'+response.data);
                    navigate('/dashboard');
                    localStorage.setItem('isLoggedIn',true);
                    localStorage.setItem('loginType','S');
                    localStorage.setItem('userId',responseData);
                    localStorage.setItem('authKey',authKey);
                    setUserType('S');
                }

            }
            else if(responseCode == 'LOGIN_FAILED:WRONG_PASSWORD')
            {
                // alert('Invalid Credentials'+response.data);
                toastError('Incorrect Email or Password!');
                
            }

        }
        catch(err)
        {
            console.log(err);
        }
    }


  return (
    <>
        <div className='logincustombody'>
        <section className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <ToastContainer
                    position="top-center"
                    autoClose={6000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={{width:"600px"}}
                />
            </div>
            <div className="col-lg-6 loginimage-section d-none d-lg-block">
                <div className="text-center d-flex align-items-center m-5">
                    <img src={config.API_BASE_URL+"images/login.png"} alt="helo" className="img-fluid" />
                </div>
                <div className="text-center mt-5">
                    <ul className="container">
                        <li className="active">
                            <h3 className="">Personalized Learning Dashboard</h3>
                            <h6 className="mb-3">Access all your courses, assignments and grades in one place.</h6>
                        </li>
                        <li>
                            <h3 className="">24/7 Access</h3>
                            <h6 className="mb-3">Learn at your own pace with 24/7 access to your courses and meterials.</h6>
                        </li>
                    </ul>
                    <div className="button-container">
                        <i className="chevron_left"></i>
                        <i className="bi bi-arrow-left-circle-fill bi-xl m-2 arrow" aria-hidden="true" id="next"></i>
                        <i className="bi bi-arrow-right-circle-fill bi-xl m-2 arrow" aria-hidden="true" id="prev"></i>
                    </div>
                </div>
            </div>
            <div className="form-section col-lg-6">
                <div className="form-wrapper ">
                    <img src={config.API_BASE_URL+"images/logo22.png"} alt="c2l_logo" className="" />
                    <h6 className="text-center">Log In and Boost Your Career on Our Path!</h6>
                    <p className="text-center">Welcome Back ! Log in to your account to continue on your journey towords
                        success.</p>
                    
                        <label className="textdark">Username</label>
                        <input type="email" placeholder="Enter Your Email" onChange={inputEmailHandler} className="w-100 custom-input" aria-required="true" required />
                        <br />
                        <label className="mt-3 textdark">Password</label>
                        <input type={showPassword ? "text" : "password"} name="password" id="password" onChange={inputPasswordHandler} placeholder="Enter Your Password"
                            className="w-100 custom-input mt-1" aria-required="true" />
                        {/* <!-- <span id="togglePassword" className="align-items-center"><i className="material-icons" >visibility</i></span> --> */}
                        <i className="bi bi-eye-slash" id="togglePassword" onClick={() => setShowPassword(!showPassword)} ></i>

                        <br />
                    

                    <div className="remember-forgot mt-3">
                        <div className="remember-me">
                            <input type="checkbox" value="remember-me" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>

                        <a href="#">Forgot password?</a>
                    </div>

                    <a href="javascript:void(0)" onClick={loginHandler} className="login-btn mb-3" type="submit">Sign In</a>
                    {/* <div className="or-divider">or</div>
                    <button className="google-signin mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96px" height="96px">
                            <path fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        <span>Sign in with Google</span>
                    </button> */}
                </div>
            </div>
        </div>
    </section>

        </div>
    
    
    </>
  )
}

export default Login