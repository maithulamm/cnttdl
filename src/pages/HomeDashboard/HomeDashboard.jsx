import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

function HomeDashboard() {
    return (
        <Fragment>
            <Helmet>
                <title>QUẢN TRỊ VIÊN | TỔNG QUAN</title>
                <meta
                    name="description"
                    content="Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP. HCM (HCMUSSH-VNU) | Tổ Công nghệ thông tin và Dữ liệu"
                />
                <meta
                    name="keywords"
                    content="Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP. HCM (HCMUSSH-VNU) | Tổ Công nghệ thông tin và Dữ liệu"
                />
                <meta property="og:title" content="QUẢN TRỊ VIÊN | TỔNG QUAN" />
                <meta
                    property="og:description"
                    content="Trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TP. HCM (HCMUSSH-VNU) | Tổ Công nghệ thông tin và Dữ liệu"
                />
            </Helmet>
            <h1>Home Dashboard</h1>
        </Fragment>
    );
}

export default HomeDashboard;
