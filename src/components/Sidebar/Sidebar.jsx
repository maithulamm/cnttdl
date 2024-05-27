import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { RiAccountCircleLine } from 'react-icons/ri';
import { sidebarItems } from '~/contexts/sidebarItems';
import { googleLogout } from '@react-oauth/google';
import { logOutStart, logOutSuccess } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';
import './sidebar.css';

export const MenuItems = ({ sidebarItems }) => {
    const [active, setActive] = useState('home');
    const handleSetActive = (slug) => {
        if (active === slug) {
            setActive((prev) => prev);
        } else {
            setActive(slug);
            localStorage.setItem('activeMenu', slug);
        }
    };

    useEffect(() => {
        const activeMenu = localStorage.getItem('activeMenu');
        if (activeMenu) {
            setActive(activeMenu);
        } else {
            setActive('home');
        }
    }, [active]);
    return (
        <Fragment>
            {sidebarItems.map((item, index) => {
                return (
                    <div className="menu" key={index}>
                        <p className="title">{item.menuText}</p>
                        <ul className="ps-1">
                            {item.subMenu.map((subItem, subIndex) => {
                                return (
                                    <li
                                        key={subIndex}
                                        className={active === subItem.slug ? 'active' : null}
                                        onClick={() => handleSetActive(subItem.slug)}
                                    >
                                        <Link to={subItem.menuLink} target={subItem.newTab ? '_blank' : '_self'}>
                                            {subItem.menuIcon}
                                            <span className="text">{subItem.menuText}</span>
                                        </Link>
                                        {subItem.subSecondMenu ? (
                                            <ul className={active === subItem.slug ? 'sub-menu show' : 'sub-menu'}>
                                                {subItem.subSecondMenu.map((secondItem, secondIndex) => {
                                                    return (
                                                        <li key={secondIndex}>
                                                            <Link to={secondItem.link}>{secondItem.text}</Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </Fragment>
    );
};

export const Sidebar = ({ userData }) => {
    const [collapsed, setCollapsed] = useState(null);
    const dispatch = useDispatch();

    const handleLogout = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn đăng xuất?',
            text: 'Bạn sẽ không thể hoàn tác hành động này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Đóng',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('user');
                window.location.href = '/';
                dispatch(logOutStart());
                dispatch(logOutSuccess());
                googleLogout();
            }
        });
    };
    
    const collapseSidebar = () => {
        if (collapsed === false) {
            setCollapsed(true);
            localStorage.setItem('collapsed', true);
        } else {
            setCollapsed(false);
            localStorage.setItem('collapsed', false);
        }
    };
    useEffect(() => {
        const collapsedLocal = localStorage.getItem('collapsed');
        if (collapsedLocal === 'true') {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, []);

    return (
        <div className={collapsed === false ? 'sidebar' : 'sidebar collapsed'}>
            <div className="menu-btn" onClick={() => collapseSidebar()}>
                <IoIosArrowDropleftCircle className="icon" />
            </div>
            <div className="head">
                <div className="user-img">
                    <Link to={'tai-khoan'}>
                        <img src={userData.avatar ? userData.avatar : 'https://picsum.photos/200'} alt="" />
                    </Link>
                </div>
                <div className="user-detail">
                    <div className="title">{userData.role ? userData.role : 'Người dùng'}</div>
                    <div className="name">{userData.name}</div>
                </div>
            </div>
            <div className="nav">
                <div className="menu">
                    <MenuItems sidebarItems={sidebarItems} />
                </div>
            </div>
            {/* Footer of Sidebar */}
            <div className="menu">
                <p className="title">Tùy chỉnh</p>
                <ul className="ps-1">
                    <li>
                        <Link to={'https://myaccount.google.com/personal-info'}>
                            <RiAccountCircleLine className="icon" />
                            <span className="text">Tài khoản</span>
                        </Link>
                    </li>
                    <li className="logout-li">
                        <Link to={'#'} onClick={() => handleLogout()}>
                            <LuLogOut className="icon" />
                            <span className="text">Đăng xuất</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
