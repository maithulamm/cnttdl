import React, { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './adminLayout.css';
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

export const AdminLayout = () => {
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

    useEffect(() => {
        if (!user || !check_arr(user?.email, arrAdmin)) {
            navigate('/login');
        }
    }, [user]);

    return (
        <HelmetProvider>
            <meta property="og:site_name" content="HCMUSSH-VNU | TỔ CÔNG NGHỆ THÔNG TIN VÀ DỮ LIỆU" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://cnttdl.hcmussh.edu.vn/" />
            <meta property="og:image" content="https://cnttdl.hcmussh.edu.vn/static/media/logo.5d5d9eef.svg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="vi_VN" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:alt" content="HCMUSSH-VNU | TỔ CÔNG NGHỆ THÔNG TIN VÀ DỮ LIỆU" />
            <Fragment>
                <div className="App">
                    <div className="admin-layout">
                        <Sidebar userData={userData} />
                        <div className="admin-layout__container">
                            <Outlet context={userData} />
                        </div>
                    </div>
                </div>
            </Fragment>
        </HelmetProvider>
    );
};
