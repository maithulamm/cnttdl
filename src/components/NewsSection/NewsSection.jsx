import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PaginationSection } from '../Pagination/Pagination';
import { news_data } from '../../datas/news_data';
import './newsSection.css';

const baseURL = 'https://kgvhhcm.hcmussh.edu.vn:8000';

export const NewsSection = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const postContainer = useRef(null);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const fetchAllPosts = () => {
        axios
            .get(`${baseURL}/api/kgvh/blog/get/cat2/0`)
            .then((res) => {
                setPosts(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const convertDate = (date) => {
        const newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    };
    const redirectImageLink = (link) => {
        const a = link.replace('\\', '/');
        return baseURL + '/' + a;
    };
    const paginate = (pageNumber) => {
        postContainer && postContainer.current.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            setCurrentPage(pageNumber);
        }, 500);
    };
    useEffect(() => {
        fetchAllPosts();
    }, []);

    return (
        // write a code for this component for the page post of each pagination
        <section className="all-post-section">
            <Container fluid className="px-0" style={{ width: 'var(--container-post-width-lg)' }}>
                {/* Tất cả thông báo */}
                <Row>
                    <Col xs="auto">
                        <h3 className="all-post-header" ref={postContainer}>
                            Thông báo
                        </h3>
                    </Col>
                </Row>
                <Row className="mt-4 px-4 justify-content-start post-pagination-container">
                    {news_data ? (
                        news_data.map((post, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <div className="single-blog-post mb-50 card">
                                    <div className="post-thumbnail">
                                        <img
                                            className="card-img-top"
                                            // src={redirectImageLink(post.thumbnail)}
                                            src={post.thumbnail}
                                            alt=""
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="post-content">
                                        <Link
                                            to={`/tien-buoc-duoi-co-sao/mo-hinh-giai-phap/chi-tiet/${post._id}`}
                                            className="post-title"
                                        >
                                            <h5>{post.title}</h5>
                                        </Link>
                                        <a href="single-post.html" className="post-title"></a>
                                        <div className="post-meta">
                                            <p className="mb-0">{`Tạo lúc: ${convertDate(post.createdAt)}`}</p>
                                        </div>
                                    </div>
                                    <Link
                                        title={post.title}
                                        to={`/tien-buoc-duoi-co-sao/mo-hinh-giai-phap/chi-tiet/${post._id}`}
                                        className="post-direction"
                                    ></Link>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <div className="loading">Vui lòng đợi! Dữ liệu bài viết đang được tải...</div>
                    )}
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <PaginationSection postPerPage={12} totalPosts={posts.length} paginate={paginate} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
