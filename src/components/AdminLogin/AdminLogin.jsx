import React, { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './adminLogin.css';
import { Sidebar } from '../Sidebar/Sidebar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { arrAdmin } from '../../redux/listAdmin';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import {
    loginStart,
    loginFailure,
    loginSuccess,
    logOutStart,
    logOutSuccess,
    logOutFailure,
} from '../../redux/authSlice';

export const AdminLogin = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    let check__role = Number(user?.email.split('@')[0]);
    const userData = {
        name: `${user?.family_name} ${user?.given_name}`,
        avatar: user?.picture,
        role: check__role === check__role ? 'Sinh viên' : 'Chuyên viên',
    };

    function check_arr(element, arr) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === element) {
                count++;
                break;
            }
        }
        return count > 0 ? true : false;
    }

    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            dispatch(loginStart());
            // console.log(tokenResponse);
            const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse?.access_token}` },
            });
            dispatch(loginSuccess(userInfo.data));
            navigate(check_arr(userInfo.data?.email, arrAdmin) ? '/admin' : '/');
            window.location.reload();
        },

        onError: (errorResponse) => {
            dispatch(loginFailure());
        },
    });

    return (
        <div class="container p-4">
            <button class="log" onClick={() => login()}>
                Quản trị viên đăng nhập
            </button>
        </div>
    );
};
