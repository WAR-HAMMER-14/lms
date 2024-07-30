import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalStateProvider';

const Logout = () => {
    const { userType, setUserType } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Common logout logic
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("authKey");
        localStorage.removeItem('loginType');
        
        if (userType === "admin") {
            localStorage.removeItem('adminId');
            setUserType('');
            navigate('/admin'); // Redirect to admin page
        } else if (userType === "S") {
            localStorage.removeItem("userId");
            setUserType('');
            navigate('/login'); // Redirect to login page
        }
        else
        {
            setUserType('');
            navigate('/login'); // Redirect to login page
        }
    }, [userType, setUserType, navigate]);

    return null;
}

export default Logout;
