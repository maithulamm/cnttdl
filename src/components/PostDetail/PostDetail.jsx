import React, { useEffect, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import { detailbg } from '../../assets';
import { FaRegHeart } from 'react-icons/fa6';
import { FiShare } from 'react-icons/fi';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaBookmark } from 'react-icons/fa6';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs, Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useLayoutEffect } from 'react';
import './postDetail.css';

const baseURL = 'https://kgvhhcm.hcmussh.edu.vn:8000';

const RelatedPost = ({ category, id }) => {
    const [relatePost, setRelatePost] = useState([]);
    const fetchRelatedPost = () => {
        axios
            .get(`${baseURL}/api/kgvh/blog/getrandom/${category}`)
            .then((res) => {
                setRelatePost(res.data.data);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    };
    const onClickedOtherPost = (param) => {
        id = param;
        window.scrollTo(0, 0);
        fetchRelatedPost();
    };
    useEffect(() => {
        fetchRelatedPost();
    }, [category]);
    return (
        <div className="post-related">
            <h4 className="post-relate-title mb-4">Bài viết liên quan</h4>
            <Row className="flex-nowrap overflow-x-auto pb-2">
                {relatePost.map((post, index) => (
                    <Col key={index} xs={5} md={4} lg={3} style={{ position: 'relative' }}>
                        <div className="post-suggest-content" key={post.id}>
                            <img
                                src={
                                    category === 'cat1'
                                        ? 'https://hcmussh.edu.vn/img/avatar.png?t=1649046939342'
                                        : baseURL + '/' + post.thumbnail
                                }
                                className="post-suggest-img"
                                alt=""
                            />
                            <p className="post-relate-title" title={post.title}>
                                {post.title}
                            </p>
                        </div>
                        <div className="relate-post-reaction d-none">
                            <Col className="likes icon-hover">
                                <FaRegHeart className="active-icon" />
                                <p className="post-detail-likes mb-0 px-2">28</p>
                            </Col>
                            <Col className="foot-post__detail">
                                <div className="share icon-hover">
                                    <FiShare />
                                    <p className="post-detail-share mb-0 px-2">72</p>
                                </div>
                                <div className="bookmark icon-hover">
                                    {post.bookmark === 'active' ? (
                                        <FaRegBookmark color="var(--color-organe)" />
                                    ) : (
                                        <FaRegBookmark color="#000" />
                                    )}
                                </div>
                            </Col>
                        </div>
                        <Link
                            to={`/khong-gian-chuyen-de/ngoi-but-sang-trong/chi-tiet/${post._id}`}
                            className="post-direction"
                            onClick={() => onClickedOtherPost(post._id)}
                        ></Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export const PostDetail = ({ pathName, urlPath }) => {
    const { id } = useParams();
    const [postDetail, setPostDetail] = useState({});
    const [postCate, setPostCate] = useState();

    const getPostDetail = () => {
        axios
            .get(baseURL + '/api/kgvh/blog/get/' + id)
            .then((res) => {
                setPostDetail(res.data.data);
                setPostCate(res.data.data.cat);
                // console.log(res.data.data[0].cat);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    };

    useLayoutEffect(() => {
        pathName ? (window.document.title = pathName) : (window.document.title = 'Chi tiết bài viết');
        window.scrollTo(0, 0);
    }, []);

    const getUpdatedHour = (param) => {
        const a = new Date(param);
        const hour = a.getHours();
        const minute = a.getMinutes();
        // find the hour difference between now and the time the post was updated

        return `Cập nhật: ${convertDate(param)} | ${hour}:${minute} `;
    };

    const convertDate = (date) => {
        const a = new Date(date);
        const day = a.getDate();
        const month = a.getMonth() + 1;
        const year = a.getFullYear();
        return day + '/' + month + '/' + year;
    };
    const htmlParser = (param) => {
        // html parser function
        var parser = new DOMParser();
        var doc = parser.parseFromString(param, 'text/html');
        return doc.body.innerHTML;
    };
    useEffect(() => {
        getPostDetail();
        return () => {
            postDetail.length = 0;
        };
    }, [id, postDetail]);

    return (
        <section className="post-detail-container">
            <Container fluid className="px-0" style={{ width: 'var(--container-width-lg)' }}>
                {/* <div className="post-header-banner">
                    <img src={detailbg} className="img img-absolute-top" alt="" />
                </div> */}
                <div className="post-body-detail">
                    <h2 className="post-detail-title break-line-2">{postDetail.title}</h2>
                    <img src={baseURL + '/' + postDetail.thumbnail} alt="" className="post-detail-main-img" />
                    <Row className="justify-content-end">
                        <Col xs="auto">
                            <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-container mt-5" separator="›">
                                <Link
                                    underline="hover"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color="text.secondary"
                                    to={'/'}
                                >
                                    Trang chủ
                                </Link>
                                <Link
                                    underline="hover"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color="text.secondary"
                                    to={urlPath ? urlPath : '/thong-bao'}
                                >
                                    {pathName ? pathName : 'Thông báo'}
                                </Link>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                                    {postDetail.title}
                                </Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col className="breadcrumb-container"></Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={10} sm={12} md={12} className="post-detail">
                            <div className="post-detail-content-header mb-3">
                                <p className="post-createAt"> {getUpdatedHour(postDetail.updatedAt)} </p>
                                <p className="post-createBy">
                                    Bởi <span>Admin</span>
                                </p>
                            </div>
                            {/* Main Content of Post */}
                            <div
                                className="post-main"
                                id="content"
                                dangerouslySetInnerHTML={{ __html: postDetail.content }}
                            ></div>
                            <br />
                            <br />
                            <div className="post-detail-reaction d-none">
                                <Col className="likes icon-hover" lg={2}>
                                    <FaRegHeart />
                                    <p className="post-detail-likes mb-0 px-2">{postDetail.likes}</p>
                                </Col>
                                <Col className="foot-post__detail" lg={5}>
                                    <div className="share icon-hover">
                                        <FiShare />
                                        <p className="post-detail-share mb-0 px-2">72</p>
                                    </div>
                                    <div className="bookmark icon-hover">
                                        {postDetail.bookmark === 'active' ? (
                                            <FaBookmark color="var(--color-organe)" />
                                        ) : (
                                            <FaRegBookmark />
                                        )}
                                    </div>
                                    <div className="more icon-hover">
                                        <MdOutlineMoreHoriz />
                                    </div>
                                </Col>
                            </div>
                        </Col>
                        {/* 
            <Col lg={3} className="post-suggest">
              <div className="post-suggest-area">
                <h4 className="post-suggest-name">Bài viết khác</h4>
                <div className="post-suggest-content">
                  <img
                    src={detailsuggestimg1}
                    className="post-suggest-img"
                    alt=""
                  />
                  <p className="post-suggest-title">
                    Bùng nổ sức trẻ tân sinh viên tại "Giao lộ ánh sáng" - Liên
                    hoan Tiếng hát Tân Sinh viên năm 2023
                  </p>
                  <Link
                    to={"//lam-theo-loi-bac/tin-tuc/chi-tiet/2"}
                    className="post-direction"
                  ></Link>
                </div>
                <div className="post-suggest-content">
                  <img
                    src={detailsuggestimg2}
                    className="post-suggest-img"
                    alt=""
                  />
                  <p className="post-suggest-title">
                    Chương trình giao lưu tiếp lửa truyền thống với chủ đề
                    "Hướng về biển, đảo quê hương"
                  </p>
                  <Link
                    to={"//lam-theo-loi-bac/tin-tuc/chi-tiet/2"}
                    className="post-direction"
                  ></Link>
                </div>
              </div>
            </Col> */}
                    </Row>
                    <RelatedPost category={postCate} id={id} />
                </div>
            </Container>
        </section>
    );
};
