import React, { useContext } from 'react'
import * as config from '../../utilities/config'
import * as SessionMsg from '../SwalSessionExpire'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../../context/GlobalStateProvider';

const AdminLogin = () => {

    const [ showPassword, setShowPassword ] = useState(false);

    const [ email, setEmail ] = useState('admin')
    const [ password, setPassword ] = useState('')

    const navigate = useNavigate();

    const { userType, setUserType } = useContext(GlobalContext)


    function submitHandler()
    {
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

        checkLogin(postData);

    }


    async function checkLogin(postData)
    {
        try{
            const response = await axios.post(config.API_URL+'adminLogin',postData);

            console.log(response.data);

            const responseCode = response.data.split('<@_@>')[0];

            const responseData = response.data.split('<@_@>')[1];

            const authKey = response.data.split('<@_@>')[2];

            const accessType = response.data.split('<@_@>')[3];


            if(responseCode == 'LOGIN_SUCCESS')
            {
                localStorage.setItem('isLoggedIn',true);
                localStorage.setItem('loginType','admin');
                localStorage.setItem('adminId',responseData);
                localStorage.setItem('authKey',authKey);
                setUserType('admin');

                console.log(authKey);

                navigate('/adminDashboard');
            }
            else if(responseCode == 'LOGIN_FAILED:WRONG_PASSWORD')
            {
                toastError('Incorrect Email or Password!');
            }

        }
        catch(err)
        {
            console.log(err);
        }

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



  return (
    <>
        <section className="container-fluid">
            <div className="row mt-5">
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
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="text-center d-flex align-items-ends mt-5">
                        <img src={config.API_BASE_URL+"images/login3.jpg"} alt="" />
                    </div>
                </div>
                <div className="form-section col-lg-6 ">
                    <div className="form-wrapper loginadmin-section p-5">
                        <img src={config.API_BASE_URL+"images/logo22.png"} alt="c2l_logo" className="" />
                        
                            <label className="textdark">Username</label>
                            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-100 custom-input" aria-required="true" required />
                            <br />
                            <label className="mt-3 textdark">Password</label>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" className="w-100 custom-input mt-1" aria-required="true" />
                            <i className="bi bi-eye-slash" id="togglePassword" onClick={() => setShowPassword(!showPassword)} ></i>
                            <br />
                        
                        <button onClick={submitHandler} className="login-btn mb-3 mt-3" type="submit">Sign In</button>
                    </div>
                </div>
            </div>
        </section>

    </>
  )
}

export default AdminLogin