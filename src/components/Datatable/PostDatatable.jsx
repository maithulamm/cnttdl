import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toastTrigger, swalAsk } from '~/utils/trigger/swal';
import axios from 'axios';
import { TbEdit, TbWorldCheck, TbWorldOff } from 'react-icons/tb';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoDocumentOutline } from 'react-icons/io5';
import { Row, Col, Pagination, Container } from 'react-bootstrap';
import { convertDate, convertCategory, getClassCategory } from '~/utils/prefunction/convertValue';
import { PaginationSection } from '../Pagination/Pagination';

import './datatable.css';
import Tooltip from '@mui/material/Tooltip';

//? Define the base URL and pathGet for the API
const baseURL = process.env.REACT_APP_API_URL;
const pathGet = 'api/cnttdl/blog/getall';
const pathDelete = 'api/cnttdl/blog/delete';

export const PostDatatable = ({ ...handleFunc }) => {
    //* Define the states, variables for the posts
    const [posts, setPosts] = useState([{}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(15);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    let dataTable = [];

    //TODO: Call the API to get all posts
    const callAPIGetAllPosts = async () => {
        await axios
            .get(`${baseURL}/${pathGet}`)
            .then((response) => {
                setPosts(response.data.data);
            })
            .catch((error) => {
                toastTrigger('Không thể lấy dữ liệu "Bài đăng" từ máy chủ', 'error');
            });
    };
    const callAPIRemovePost = async (id) => {
        await axios
            .delete(`${baseURL}/${pathDelete}/${id}`)
            .then((response) => {
                toastTrigger('Xóa bài đăng thành công', 'success');
                window.location.reload();
            })
            .catch((error) => {
                console.log('error', error.response.data.message);
                toastTrigger('Xảy ra lỗi không thể xóa bài đăng', 'error');
            });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRemove = (id) => {
        swalAsk('Xóa bài đăng này sẽ không thể hoàn tác', 'warning', () => {
            callAPIRemovePost(id);
        });
    };

    useEffect(() => {
        callAPIGetAllPosts();
    }, []);

    return (
        <div className="table-responsive" style={{ maxHeight: '60vh' }}>
            <div className="container">
                <Row className="overflow-y-auto datatable-scrollbar">
                    <table className="table post-datatable">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Bài đăng (Tiêu đề)</th>
                                <th scope="col">Danh mục</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Người tạo</th>
                                <th scope="col">Ngày tạo</th>
                                <th scope="col" className="text-center">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.length != 0 ? (
                                currentPosts.map((post, index) => (
                                    <tr key={post._id} className="" onClick={() => handleFunc.handleGetDetail(post)}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span>{`${post.title}`} </span>
                                        </td>
                                        <td>
                                            <span className={`${getClassCategory(post.category)} p-2`}>
                                                {convertCategory(post.category)}
                                            </span>
                                        </td>
                                        <td>
                                            <Tooltip
                                                title={post.status === 'published' ? 'Công khai' : 'Bản nháp'}
                                                arrow
                                            >
                                                {post.status === 'published' ? (
                                                    <TbWorldCheck className="icon-lg icon-valid" />
                                                ) : (
                                                    <TbWorldOff className="icon-lg icon-invalid" />
                                                )}{' '}
                                            </Tooltip>
                                        </td>
                                        <td>
                                            <Row className="justify-content-center">
                                                <Col xs="auto">
                                                    <img
                                                        className="creator-img"
                                                        src={post.posterAvatar}
                                                        alt="Ảnh bài đăng"
                                                        title={post.createdBy}
                                                        loading="lazy"
                                                    />
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>{convertDate(post.createdAt)}</td>
                                        <td>
                                            <Row className="justify-content-center" style={{ flexWrap: 'nowrap' }}>
                                                <Col xs="auto" className="px-1">
                                                    <Link
                                                        to={`/admin/posts/edited/${post._id}`}
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        <TbEdit />
                                                    </Link>
                                                </Col>
                                                <Col xs="auto" className="px-1">
                                                    <Link
                                                        to={'#'}
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleRemove(post._id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Không có dữ liệu bài đăng... (Hãy đợi trong giây lát! hoặc liên hệ với quản trị
                                        viên!)
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Row>
            </div>
            <Container className="justify-content-center">
                <PaginationSection
                    type={'rounded'}
                    postPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
            </Container>
        </div>
    );
};
