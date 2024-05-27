import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PostDatatable } from '~/components/Datatable';
import { Container, Row, Col } from 'react-bootstrap';
import parse from 'html-react-parser';
import { TbEyeSearch, TbListSearch } from 'react-icons/tb';

function PostsListPage() {
    const [posts, setPosts] = useState([]);
    const previewRef = useRef(null);
    const [previewPost, setPreviewPost] = useState({
        title: 'Tiêu đề bài viết',
        content: 'Vui lòng chọn bài viết để xem trước...',
    });

    const handleShowPreview = (post) => {
        setPreviewPost(post);
        // scroll to top of the class post-preview
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>QUẢN TRỊ VIÊN | DANH SÁCH BÀI ĐĂNG</title>
                <meta name="description" content="CNTTDL | Danh sách bài viết" />
            </Helmet>
            <Container fluid className="pt-1">
                {previewPost.title ? (
                    <Row className="mt-3">
                        <Col lg={7} md={12} sm={12}>
                            <h4 className="d-flex align-items-center first-title mb-4">
                                <span>
                                    <TbListSearch /> Danh sách bài đăng
                                </span>
                            </h4>
                            <PostDatatable handleGetDetail={handleShowPreview} />
                        </Col>

                        <Col lg={5} md={12} sm={12}>
                            <h4 className="d-flex align-items-center first-title mb-4">
                                <span>
                                    <TbEyeSearch /> Xem trước bài đăng
                                </span>
                            </h4>
                            {previewPost.title && (
                                <div className="post-preview">
                                    <h5 className="post-preview-title mb-3">{previewPost.title}</h5>
                                    <div className="post-preview_container">
                                        <blockquote className="fw-bold fst-italic">Nội dung bài đăng: </blockquote>
                                        <hr />
                                        <p className="post-preview-content" ref={previewRef}>
                                            {parse(previewPost.content)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                ) : (
                    <Row className="mt-3 justify-content-start">
                        <Col lg={7} md={12} sm={12}>
                            <PostDatatable handleGetDetail={handleShowPreview} />
                        </Col>
                    </Row>
                )}
            </Container>
        </HelmetProvider>
    );
}

export default PostsListPage;
