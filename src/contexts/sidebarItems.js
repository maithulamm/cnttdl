import { TbCategory2, TbNewSection, TbHome } from 'react-icons/tb';
import { ImNewspaper } from 'react-icons/im';
import { CgWebsite } from 'react-icons/cg';
import { MdOutlineLockReset, MdOutlineFindInPage, MdOutlineAttachEmail } from 'react-icons/md';
import { SlSupport } from 'react-icons/sl';
export const sidebarItems = [
    // Tổng quan
    {
        menuType: 'title',
        menuText: 'Tổng quan',
        subMenu: [
            {
                menuText: 'Trang thông tin', // tên menu
                slug: 'CNTTDL-website', // slug của menu
                menuIcon: <TbHome className="icon" />, // icon của menu
                menuLink: '/', // đường dẫn link tới trang
                newTab: true, // true: mở tab mới, false: mở tab hiện tại, mặc định là false
            },
            {
                menuText: 'Tổng quan',
                slug: '',
                menuIcon: <CgWebsite className="icon" />,
                menuLink: '',
            },
        ],
    },
    // Quản lý
    {
        menuType: 'title',
        menuText: 'Bài đăng',
        subMenu: [
            {
                menuText: 'Tạo bài đăng mới',
                slug: 'new-post',
                menuIcon: <TbNewSection className="icon" />,
                menuLink: 'posts/new',
            },
            {
                menuText: 'Quản lý bài đăng',
                slug: 'posts',
                menuIcon: <ImNewspaper className="icon" />,
                menuLink: 'posts',
            },
            {
                menuText: 'Danh mục bài đăng',
                slug: 'categories',
                menuIcon: <TbCategory2 className="icon" />,
                menuLink: 'categories',
                // subSecondMenu: [
                //     {
                //         text: 'Quản lý tài khoản',
                //         link: 'account/management',
                //         slug: 'user',
                //     },
                //     {
                //         text: 'Thêm tài khoản',
                //         link: 'account/new',
                //         slug: 'user',
                //     },
                //     {
                //         text: 'Phân quyền',
                //         link: 'account/permission',
                //         slug: 'user',
                //     },
                // ],
            },
        ],
    },
    // Cài đặt
    {
        menuType: 'title',
        menuText: 'Chức năng',
        subMenu: [
            {
                menuText: 'Hỗ trợ SV/GV online',
                slug: 'support-online',
                menuIcon: <SlSupport className="icon" />,
                menuLink: '#',
            },
            {
                menuText: 'Kiểm tra thông tin',
                slug: 'check-info',
                menuIcon: <MdOutlineFindInPage className="icon" />,
                menuLink: '#',
            },
            {
                menuText: 'Gửi Email thông báo',
                slug: 'send-email',
                menuIcon: <MdOutlineAttachEmail className="icon" />,
                menuLink: '#',
            },
        ],
    },
];
