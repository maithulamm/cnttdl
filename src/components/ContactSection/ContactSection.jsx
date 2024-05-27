import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';

import './contactSection.css';

export const Contact = () => {
    return (
        <section className="contact-container">
            <Container fluid className="px-0 pt-5">
                <Row className="justify-content-center">
                    <Col lg={8} className="contact-detail">
                        <div className="contact-main" id="content">
                            <h3 className="contact-detail-content">Phòng Hành chính - Tổng hợp</h3>
                            <h5 className="contact-detail-content">
                                Văn phòng: Phòng A.003, Số 10-12 Đinh Tiên Hoàng, phường Bến nghé, Quận 1, Thành phố Hồ
                                Chí Minh.
                            </h5>
                            {/* <h5 className="contact-detail-content">
                Điện thoại: (84 - 8) 38.293828 (số nội bộ: 101)
              </h5> */}
                            <h5 className="contact-detail-content">
                                Email:
                                <a href="mailto:hanhchinh@hcmussh.edu.vn" className="email-link">
                                    &nbsp;hanhchinh@hcmussh.edu.vn
                                </a>
                            </h5>
                            <h5 className="contact-detail-content">
                                Phòng Hành chính - Tổng hợp tiếp khách và sinh viên từ thứ 2 đến thứ 6 hàng tuần:
                            </h5>
                            <p>
                                <ul>
                                    <li className="mb-2">- Sáng: từ 8 giờ 00 đến 11 giờ 30</li>
                                    <li className="my-2">- Chiều: từ 13 giờ 30 đến 17 giờ 00</li>
                                </ul>
                            </p>
                            <br />
                            <br />
                            <h3 className="contact-detail-content">Tổ Công nghệ thông tin và dữ liệu</h3>
                            <h5 className="contact-detail-content">
                                Văn phòng: Phòng A.101, Cơ sở Đinh Tiên Hoàng, Phường Bến Nghé, Quận 1, Tp. Hồ Chí Minh
                            </h5>
                            {/* <h5 className="contact-detail-content">
                Điện thoại: (84 - 8) 38.293828 (số nội bộ: 101)
              </h5> */}
                            <h5 className="contact-detail-content">
                                Email:
                                <a href="mailto:tocnttvadl@hcmussh.edu.vn" className="email-link">
                                    &nbsp;tocnttvadl@hcmussh.edu.vn
                                </a>
                            </h5>
                            <h5 className="contact-detail-content">
                                Tổ Công nghệ thông tin và dữ liệu tiếp khách và sinh viên từ thứ 2 đến thứ 6 hàng tuần:
                            </h5>
                            <p>
                                <ul>
                                    <li className="mb-2">- Sáng: từ 8 giờ 00 đến 11 giờ 30</li>
                                    <li className="my-2">- Chiều: từ 13 giờ 30 đến 17 giờ 00</li>
                                </ul>
                            </p>
                            <br />
                            <br />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
