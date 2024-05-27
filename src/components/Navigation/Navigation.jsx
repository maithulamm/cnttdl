import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaHome } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import './navigation.css';
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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { arrAdmin } from '../../redux/listAdmin';

export const Navigation = () => {
    const [user, setUser] = useState(useSelector((state) => state.auth.login.currentUser));
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const logout = () => {
        dispatch(logOutStart());
        dispatch(logOutSuccess());
        googleLogout();
        setUser(null);
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

    return (
        <nav>
            <div className="wrapper">
                <input type="radio" name="slider" id="menu-btn" />
                <input type="radio" name="slider" id="close-btn" />
                <ul className="nav-links">
                    <label htmlFor="close-btn" className="btn close-btn">
                        <i className="fas fa-times"></i>
                    </label>
                    {/* Menu 0 - Trang chủ*/}
                    <li className="prime-li">
                        <Link to={'/'} className="desktop-item">
                            Trang chủ
                        </Link>
                        <input type="checkbox" id="showDrop6" />
                        <label htmlFor="showDrop6" className="mobile-item">
                            {/* Responsive Menu Item */}
                            <Link to={'/'} className="mobile-item ps-0 py-0">
                                Trang chủ
                            </Link>
                        </label>
                    </li>
                    {/* Menu 1 - Giới thiệu*/}
                    <li className="prime-li">
                        <Link to={'#'} target="_self" className="desktop-item">
                            Giới thiệu <i className="fa-solid fa-chevron-down ms-1"></i>
                        </Link>
                        <input type="checkbox" id="showDrop" />
                        <label htmlFor="showDrop" className="mobile-item">
                            {/* Responsive Menu Item */}
                            Giới thiệu <i className="fa-solid fa-chevron-down ms-1"></i>
                        </label>
                        <ul className="drop-menu">
                            <li>
                                <Link to={'/gioi-thieu/vnu-hcmussh'}>Trường Đại học KHXH và NV</Link>
                            </li>
                            <li>
                                <Link to={'/gioi-thieu/to-cnttdl'}>Tổ CNTT và DL</Link>
                            </li>
                            <li>
                                <Link to={'/gioi-thieu/nhan-su'}>Cơ cấu nhân sự</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Menu 2 - Tin tức, thông báo*/}
                    <li className="prime-li">
                        <Link to={'#'} className="desktop-item">
                            Tin tức <i className="fa-solid fa-chevron-down ms-1"></i>
                        </Link>
                        <input type="checkbox" id="showDrop2" />
                        <label htmlFor="showDrop2" className="mobile-item">
                            Tin tức <i className="fa-solid fa-chevron-down ms-1"></i>
                        </label>
                        <ul className="drop-menu">
                            <li>
                                <Link to={'/thong-bao'}>Thống kê và báo cáo dữ liệu</Link>
                            </li>
                            <li>
                                <Link to={'/thong-bao'}>Bài viết khác</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Menu 3 - Website chức năng*/}
                    <li className="prime-li">
                        <Link to={'#'} className="desktop-item">
                            Website chức năng <i className="fa-solid fa-chevron-down ms-1"></i>
                        </Link>
                        <input type="checkbox" id="showDrop3" />
                        <label htmlFor="showDrop3" className="mobile-item">
                            Website chức năng <i className="fa-solid fa-chevron-down ms-1"></i>
                        </label>
                        <ul className="drop-menu">
                            <li>
                                <Link to={'https://khaosat.hcmussh.edu.vn/'} target="_blank">
                                    Hệ thống khảo sát Online
                                </Link>
                            </li>
                            <li>
                                <Link to={'https://letotnghiep.hcmussh.edu.vn/'} target="_blank">
                                    Đăng ký lễ tốt nghiệp
                                </Link>
                            </li>
                            <li>
                                <Link to={'https://vbcc.hcmussh.edu.vn/'} target="_blank">
                                    Tra cứu văn bằng chứng chỉ
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/* Menu 4 - Thư viện tài liệu*/}
                    <li className="prime-li">
                        <Link to={'#'} className="desktop-item">
                            Thư viện tài liệu <i className="fa-solid fa-chevron-down ms-1"></i>
                        </Link>
                        <input type="checkbox" id="showDrop3" />
                        <label htmlFor="showDrop3" className="mobile-item">
                            Thư viện tài liệu <i className="fa-solid fa-chevron-down ms-1"></i>
                        </label>
                        <ul className="drop-menu">
                            <li>
                                <Link to={''}>Biểu mẫu</Link>
                            </li>
                            <li>
                                <Link to={''}>Hướng dẫn sử dụng</Link>
                            </li>
                            <li>
                                <Link to={''}>Góc chia sẻ</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Menu 5 - Tiện ích, chức năng*/}
                    <li className="prime-li">
                        <Link to={'#'} className="desktop-item">
                            Tiện ích, chức năng
                            <i className="fa-solid fa-chevron-down ms-1"></i>
                        </Link>
                        <input type="checkbox" id="showDrop4" />
                        <label htmlFor="showDrop4" className="mobile-item">
                            Tiện ích, chức năng
                            <i className="fa-solid fa-chevron-down ms-1"></i>
                        </label>
                        <ul className="drop-menu">
                            <li>
                                <Link to={'/tien-ich/giai-dap-online'}>Hỗ trợ trực tuyến</Link>
                            </li>
                            {/* <li>
                                <Link to={'/tien-ich/reset-lms'} target="_blank">
                                    Cấp lại mật khẩu tài khoản LMS
                                </Link>
                            </li> */}
                            {/* <li>
                                <Link to={''}>Hệ thống soạn thảo trực tuyến</Link>
                            </li> */}
                            <li>
                                <Link to={'/hoi-dap'}>Câu hỏi thường gặp</Link>
                            </li>
                        </ul>
                    </li>
                    {/* Menu 6 - Đăng nhập/Tài khoản*/}
                    {/* <li>
                        {!user ? (
                            <Link to={'/'} className="desktop-item" onClick={() => login()}>
                                <FaRegUserCircle /> Đăng nhập
                            </Link>
                        ) : check_arr(user?.email, arrAdmin) ? (
                            <Link to={'/admin'} className="desktop-item">
                                <FaRegUserCircle /> {`Tài khoản: ${user?.family_name} ${user?.given_name}`}
                            </Link>
                        ) : (
                            <Link to={'/'} className="desktop-item">
                                <FaRegUserCircle /> {`Tài khoản: ${user?.family_name} ${user?.given_name}`}
                            </Link>
                        )}
                        <input type="checkbox" id="showDrop6" />
                        <label htmlFor="showDrop6" className="mobile-item">
                            {!user ? (
                                <Link to={'/'} className="mobile-item ps-0 py-0" onClick={() => login()}>
                                    <FaRegUserCircle /> Đăng nhập
                                </Link>
                            ) : check_arr(user?.email, arrAdmin) ? (
                                <Link to={'/admin'} className="mobile-item ps-0 py-0">
                                    <FaRegUserCircle /> {user?.family_name} {user?.given_name}
                                </Link>
                            ) : (
                                <Link to={'/'} className="mobile-item ps-0 py-0">
                                    <FaRegUserCircle /> {user?.family_name} {user?.given_name}
                                </Link>
                            )}
                        </label>
                        {user ? (
                            <ul className="drop-menu">
                                <li>
                                    <Link to={'/'} onClick={logout}>
                                        Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <>
                            </>
                        )}
                    </li> */}
                </ul>
                <label htmlFor="menu-btn" className="btn menu-btn">
                    <i className="fas fa-bars"></i>
                </label>
            </div>
        </nav>
    );
};
