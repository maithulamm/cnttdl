import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { VscLibrary } from 'react-icons/vsc';

import { Link } from 'react-router-dom';

import './referencesSection.css';
import { avatar, emailEdu, googleDrive, lmsImage, microsoftOffice } from '../../assets';

export const ReferencesSection = () => {
    return (
        <section className="refers-section">
            <Container fluid className="px-0" style={{ width: 'var(--container-width-md)' }}>
                <Row className="section-header">
                    <h3 className="section-title fw-bold">
                        <VscLibrary /> Thư viện tài liệu
                    </h3>
                </Row>
                <div className="refers-container">
                    <Row className="refers-overflow-md">
                        <Col xxl={6} xl={6} sm={9} className="">
                            <article className="refers-card">
                                <div className="card-background">
                                    <img src={microsoftOffice} alt="Microsoft Office 365 Education" />
                                </div>
                                <div className="refers-content">
                                    <div className="refers-card_header">
                                        <div className="refers-type">Tài liệu</div>
                                        <div className="latest-article">Bài viết mới</div>
                                    </div>
                                    <div className="refers-card_content">
                                        <h2>Microsoft Office 365 Education</h2>
                                        <p>
                                            Microsoft Office 365 Education là một dịch vụ dành cho giáo dục, cung cấp
                                            các công cụ như Microsoft Word, Excel, PowerPoint, OneNote, Microsoft Teams,
                                            và nhiều hơn nữa....
                                        </p>
                                    </div>
                                    <div className="blog-preview_bottom">
                                        <a href="#" className="link-direct_card">
                                            <FaArrowRight />
                                        </a>
                                    </div>
                                </div>
                                <a href="#" className="card-linked"></a>
                            </article>
                        </Col>
                        <Col xxl={6} xl={6} sm={9} className="">
                            <article className="refers-card">
                                <div className="card-background">
                                    <img src={lmsImage} alt="Hệ thống dạy, học trực tuyến LMS" />
                                </div>
                                <div className="refers-content">
                                    <div className="refers-card_header">
                                        <div className="refers-type guide">Hướng dẫn sử dụng</div>
                                        <div className="latest-article">Bài viết mới</div>
                                    </div>
                                    <div className="refers-card_content">
                                        <h2>Hướng dẫn đổi mật khẩu tài khoản LMS (Lần đầu đăng nhập)</h2>
                                        <p>
                                            Hệ thống dạy, học trực tuyến LMS là một hệ thống quản lý học tập trực tuyến
                                            được phát triển bởi Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc
                                            gia Hồ Chí Minh....
                                        </p>
                                    </div>
                                    <div className="blog-preview_bottom">
                                        <a href="#" className="link-direct_card">
                                            <FaArrowRight />
                                        </a>
                                    </div>
                                </div>
                                <a href="#" className="card-linked"></a>
                            </article>
                        </Col>
                        <Col xxl={6} xl={6} sm={9} className="">
                            <article className="refers-card">
                                <div className="card-background">
                                    <img src={googleDrive} alt="Google Drive" />
                                </div>
                                <div className="refers-content">
                                    <div className="refers-card_header">
                                        <div className="refers-type guide">Hướng dẫn sử dụng</div>
                                        <div className="latest-article">Bài viết mới</div>
                                    </div>
                                    <div className="refers-card_content">
                                        <h2>Hướng dẫn sử dụng không gian Google Drive</h2>
                                        <p>
                                            Google Drive là một dịch vụ lưu trữ và đồng bộ hóa dữ liệu trực tuyến do
                                            Google cung cấp. Dịch vụ này cho phép người dùng lưu trữ dữ liệu trên đám
                                            mây, đồng bộ dữ liệu giữa các thiết bị và chia sẻ dữ liệu với người dùng
                                            khác....
                                        </p>
                                    </div>
                                    <div className="blog-preview_bottom">
                                        <a href="#" className="link-direct_card">
                                            <FaArrowRight />
                                        </a>
                                    </div>
                                </div>
                                <a href="#" className="card-linked"></a>
                            </article>
                        </Col>
                        <Col xxl={6} xl={6} sm={9} className="">
                            <article className="refers-card">
                                <div className="card-background">
                                    <img src={emailEdu} alt="Email Education Google" />
                                </div>
                                <div className="refers-content">
                                    <div className="refers-card_header">
                                        <div className="refers-type ques">Câu hỏi</div>
                                        <div className="latest-article">Bài viết mới</div>
                                    </div>
                                    <div className="refers-card_content">
                                        <h2 title='Hướng dẫn reset mật khẩu Gmail đuôi "hcmussh.edu.vn"'>
                                            Hướng dẫn reset mật khẩu Gmail đuôi "hcmussh.edu.vn"
                                        </h2>
                                        <p>
                                            Email Education Google là một dịch vụ email được cung cấp bởi Google, dành
                                            cho các tổ chức giáo dục. Email Education Google cung cấp các tính năng
                                            tương tự như Gmail thông thường, bao gồm cả ứng dụng Gmail, Google Drive,
                                            Google Meet, Google Chat, Google Calendar, Google Classroom, Google
                                            Jamboard, Google Sites....
                                        </p>
                                    </div>
                                    <div className="blog-preview_bottom">
                                        <a href="#" className="link-direct_card">
                                            <FaArrowRight />
                                        </a>
                                    </div>
                                </div>
                                <a href="#" className="card-linked"></a>
                            </article>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};
