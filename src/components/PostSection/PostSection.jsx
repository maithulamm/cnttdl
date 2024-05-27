import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa6';
import { PiNewspaperClipping } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './postSection.css';

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = 'https://kgvhhcm.hcmussh.edu.vn:8000';

export const PostSection = () => {
    const [data, setData] = useState([]);
    const [newestPost, setNewestPost] = useState({});
    // const [recentPosts, setRecentPosts] = useState([]);

    const fetchNewestPost = () => {
        axios
            .get(baseURL + '/api/kgvh/blog/get/news/1')
            .then((res) => {
                setNewestPost(res.data.data[0]);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    };
    const fetchRecentPosts = () => {
        axios
            .get(baseURL + '/api/kgvh/blog/get/news/4')
            .then((res) => {
                var a = res.data.data;
                a.shift();
                setData(a);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    };
    const redirectImageLink = (link) => {
        const a = link.replace('\\', '/');
        return baseURL + '/' + a;
    };
    const convertDate = (date) => {
        const a = new Date(date);
        const day = a.getDate();
        const month = a.getMonth() + 1;
        const year = a.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };
    useEffect(() => {
        fetchNewestPost();
        fetchRecentPosts();
    }, []);
    return (
        <section className="post-container" id="lamTheoLoiBac">
            <Container fluid className="px-0" style={{ width: 'var(--container-width-md)' }}>
                <Row className="section-header">
                    <h3 className="section-title fw-bold">
                        <PiNewspaperClipping /> Tin tức - Thông báo
                    </h3>
                    <p className="section-view mb-0">
                        <Link to={'/tin-tuc'} className="view-text" title="Xem tất cả">
                            Xem tất cả <FaArrowRight />
                        </Link>{' '}
                    </p>
                </Row>
                <Row className="section-body justify-content-between">
                    {/* Left Section Post */}
                    <Col xxl={6}>
                        <div className="post-item newest-post h-md-100">
                            <img src={baseURL + '/' + newestPost.thumbnail} alt="" className="img-round post-img" />
                            <p className="post-title title-responsive mt-3">{newestPost.title}</p>
                            <div className="post-content ps-0">
                                <p className="post-description description-responsive">{newestPost.description}</p>
                                <p className="post-created">
                                    <i>Đăng ngày : {convertDate(newestPost.updatedAt)} </i>
                                </p>
                            </div>
                            <Link
                                to={'/su-kien/chi-tiet/' + newestPost._id}
                                className="post-direction"
                                title="Nhấn để xem chi tiết"
                            ></Link>
                        </div>
                    </Col>
                    <div className="baseline-mobile">
                        <hr
                            style={{
                                borderTopWidth: '3px',
                                margin: '0.5rem 0 !important',
                            }}
                        />
                    </div>
                    {/* Right Section Post */}
                    <Col xxl={6} className="mini-post ps-5 d-flex flex-column justify-content-between">
                        {/* Render recent posts */}
                        <div className="w-100 d-flex flex-column justify-content-between">
                            {data.map((post) => (
                                <Row key={post.title} className="post-item recent-post mb-3">
                                    <Col xxl={5} md={5} className="post-img recent-post-img p-0 pe-3">
                                        <img src={redirectImageLink(post.thumbnail)} alt="" className="img-round" />
                                    </Col>
                                    <Col xxl={7} md={7} className="p-0 px-2">
                                        <p className="post-title-mini title-responsive" title={post.title}>
                                            {post.title}
                                        </p>
                                        <div className="post-content ps-0">
                                            <p className="post-description description-responsive">
                                                {post.description}
                                            </p>
                                            <p className="post-created text-end">
                                                <i>Đăng ngày : {convertDate(post.updatedAt)}</i>
                                            </p>
                                        </div>
                                    </Col>
                                    <Link
                                        to={'/su-kien/chi-tiet/' + post._id}
                                        className="post-direction"
                                        title="Nhấn để xem chi tiết"
                                    ></Link>
                                </Row>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
