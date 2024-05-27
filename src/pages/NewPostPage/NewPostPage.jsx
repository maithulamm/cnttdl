import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { NewPostForm } from '~/components/FormsLayout';
import { useOutletContext } from 'react-router-dom';

function NewPostPage() {
    const [value, setValue] = useState('');
    // const [userData, setUserData] = useOutletContext();
    const userContext = useOutletContext();
    return (
        <Fragment>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>QUẢN TRỊ VIÊN | TẠO MỚI BÀI ĐĂNG</title>
                    <meta name="description" content="CNTTDL | Tạo bài viết mới" />
                </Helmet>
                <NewPostForm placeholder={''} userData={userContext} />
            </HelmetProvider>
        </Fragment>
    );
}

export default NewPostPage;
