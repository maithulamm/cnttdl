import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import { useOutletContext, useParams } from 'react-router-dom';
import { EditPostForm } from '~/components/FormsLayout/EditPostForm';
import { toastTrigger } from '~/utils/trigger/swal';

const baseURL = process.env.REACT_APP_API_URL;
const pathUpdatePost = 'api/cnttdl/blog/get';

function PostEditPage() {
    const { postId } = useParams();
    const [postData, setPostData] = useState({});
    const userContext = useOutletContext();

    // ? Call API to get post data by id
    const callAPIGetDetailPost = async (postId) => {
        console.log('postId', postId);
        console.log('baseURL', baseURL);
        await axios
            .get(`${baseURL}/${pathUpdatePost}/${postId}`)
            .then((res) => {
                setPostData(res.data.data);
                toastTrigger('Lấy dữ liệu bài viết thành công!', 'success');
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Lấy dữ liệu bài viết thất bại!', 'error');
            });
    };

    useEffect(() => {
        callAPIGetDetailPost(postId);
    }, []);

    return (
        <Fragment>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>QUẢN TRỊ VIÊN | CHỈNH SỬA BÀI ĐĂNG</title>
                    <meta name="description" content="CNTTDL | Tạo bài viết mới" />
                </Helmet>
                <EditPostForm userData={userContext} postDetail={postData} handleSetPost={setPostData} />
            </HelmetProvider>
        </Fragment>
    );
}

export default PostEditPage;
