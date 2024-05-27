import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import HomeSection from '../pages/HomePage/HomeSection';
import FAQsPage from '../pages/FAQsPage/FAQsPage';
import { PostDetail } from '../components/PostDetail';
import ContactPage from '../pages/ContactPage/ContactPage';
import IntroPage from '../pages/IntroPage/IntroPage';
import NewsPage from '../pages/NewsPage/NewsPage';
import HomeDashboard from '../pages/HomeDashboard/HomeDashboard';
import NewPostPage from '../pages/NewPostPage/NewPostPage';
import PostsListPage from '../pages/PostsListPage/PostsListPage';
import PostEditPage from '../pages/PostEditPage/PostEditPage';
import AdminLoginPage from '../pages/AdminLoginPage/AdminLoginPage';
import SupPage from '../pages/SupPage/SupPage';
// const HomeSection = lazy(() => import('~/components/HomeSection'));

const publicRoutes = [
    {
        path: '/',
        component: <HomeSection />,
        exact: true,
    },
    // Giới thiệu
    {
        path: '/gioi-thieu/vnu-hcmussh',
        component: <IntroPage nameOfIntro={'HCMUSSH'} />,
        exact: true,
    },
    {
        path: '/gioi-thieu/to-cnttdl',
        component: <IntroPage nameOfIntro={'CNTTDL'} />,
        exact: true,
    },
    {
        path: '/gioi-thieu/nhan-su',
        component: <IntroPage nameOfIntro={'NHANSU'} />,
        exact: true,
    },
    // Thông báo - Sự kiện
    {
        path: '/thong-bao',
        component: <NewsPage />,
        exact: true,
    },
    {
        path: '/su-kien/chi-tiet/:id',
        component: <PostDetail />,
        exact: true,
    },
    // Hỏi đáp
    {
        path: '/hoi-dap',
        component: <FAQsPage />,
        exact: true,
    },
    // Thông tin liên hệ
    {
        path: '/lien-he',
        component: <ContactPage />,
        exact: true,
    },
    {
        path: '/login',
        component: <AdminLoginPage />,
        exact: true,
    },
    {
        path: '/tien-ich/giai-dap-online',
        component: <SupPage />,
        exact: true,
    },
];

const privateRoutes = [
    {
        path: '',
        component: <HomeDashboard />,
        exact: true,
    },
    {
        path: 'posts',
        component: <PostsListPage />,
        exact: true,
    },
    {
        path: 'posts/new',
        component: <NewPostPage />,
        exact: true,
    },
    {
        path: 'posts/edited/:ư',
        component: <PostEditPage />,
        exact: true,
    },
];

export { publicRoutes, privateRoutes };
