import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { logoussh, logovnu } from '../../assets';
import { FaPhone, FaLocationDot, FaEnvelope, FaSquareFacebook } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import './footer.css';

export const Footer = () => {
    return (
        <footer className="footer-container">
            <Container fluid className="px-0" style={{ width: 'var(--container-width-md)' }}>
                <Row className="align-items-center justify-content-center">
                    <Col xxl={8} xl={6} sm={12} className="footer-left">
                        <div className="info">
                            {/* Footer Content */}
                            <h5 className="fw-bold footer-content__title">
                                Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia TP.HCM
                            </h5>
                            <h5 className="fw-bold footer-content__title">- Tổ Công nghệ thông tin và Dữ liệu -</h5>

                            <ul className="footer-content__list">
                                <li>
                                    <Row className="align-items-center list-contact">
                                        <Col xs="auto" className="pe-1">
                                            <FaLocationDot className="footer-icon" />
                                        </Col>
                                        <Col className="ps-1">
                                            <p className="footer-content mb-1">
                                                Văn phòng: Phòng A.101, Cơ sở Đinh Tiên Hoàng, Phường Bến Nghé, Quận 1,
                                                Tp. Hồ Chí Minh
                                            </p>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row className="align-items-center list-contact">
                                        <Col xs="auto" className="pe-1">
                                            <FaPhone className="footer-icon" />
                                        </Col>
                                        <Col className="ps-1">
                                            <Link to="tel:028.38293828" className="hyperlink-a">
                                                Hotline: 028.3829.3828 (số nhánh 171)
                                            </Link>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row className="align-items-center list-contact">
                                        <Col xs="auto" className="pe-1">
                                            <FaEnvelope className="footer-icon" />
                                        </Col>
                                        <Col className="ps-1">
                                            <Link to="mailto: tocnttvadl@hcmussh.edu.vn" className="hyperlink-a">
                                                Email: tocnttvadl@hcmussh.edu.vn
                                            </Link>
                                        </Col>
                                    </Row>
                                </li>
                                <li>
                                    <Row className="align-items-center list-contact">
                                        <Col xs="auto" className="pe-1">
                                            <FaSquareFacebook className="footer-icon" />
                                        </Col>
                                        <Col className="ps-1">
                                            <Link to={'https://www.facebook.com/ussh.vnuhcm'} className="hyperlink-a">
                                                Fanpage: Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia
                                                Tp. HCM
                                            </Link>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xxl={4} xl={6} sm={12} className="footer-right">
                        {/* Logo Content */}
                        <Row className="align-items-center logo-content mb-3 justify-content-center">
                            <Col xs="auto" className="pe-1">
                                <Link to="https://vnuhcm.edu.vn/" title="Đại học Quốc gia TP.HCM">
                                    <img src={logovnu} alt="Đại học Quốc gia TP. Hồ Chí Minh" className="footer-logo" />
                                </Link>
                            </Col>
                            <Col xs="auto" className="pe-1">
                                <Link to="https://hcmussh.edu.vn/" title="Trường Đại học Khoa học Xã hội và Nhân văn">
                                    <img
                                        src={logoussh}
                                        alt="Trường Đại học Khoa học Xã hội và Nhân văn - HCMUSSH"
                                        className="footer-logo logo-ussh"
                                    />
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
