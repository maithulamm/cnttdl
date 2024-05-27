import React from 'react';
import { Accordion, Container, Row, Col } from 'react-bootstrap';
import { PiStudentBold } from 'react-icons/pi';
import { FaUserTie } from 'react-icons/fa';

import './FAQSection.css';

export const FAQSection = () => {
    return (
        <section className="FAQSection">
            <h3 className="FAQSection__title text-center mb-4">Câu hỏi thường gặp</h3>
            <Container fluid className="px-0 FAQ_container" style={{ width: 'var(--container-width-md)' }}>
                {/* Sinh viên FAQs */}
                <h4 className="FAQSection_student text-center">
                    <div className="divider-div">
                        <PiStudentBold className="icon-style1" />
                    </div>
                    <p className="mb-0">Sinh viên</p>
                </h4>
                <Row className="section justify-content-center mt-4">
                    <Col lg={10} md={10} sm={12} className="FAQSection__content">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Hỗ trợ cấp lại mật khẩu tài khoản LMS (Sinh viên)</Accordion.Header>
                                <Accordion.Body>
                                    <p className="mb-0">
                                        Bước 1: Sinh viên vui lòng chuẩn bị hình ảnh chụp thẻ sinh viên và liên hệ với
                                        Tổ Công nghệ thông tin và dữ liệu để được cấp lại mật khẩu tài khoản LMS.
                                    </p>
                                    <p className="mb-0">
                                        Bước 2: Sinh viên cung cấp những thông tin sau cho Tổ Công nghệ thông tin và dữ
                                        liệu: Họ và tên, Mã số sinh viên, Khoa/ Ngành đang theo học, Số điện thoại cá
                                        nhân, Email cá nhân (Nhận Email cung cấp mật khẩu mới), Hình ảnh chụp thẻ sinh
                                        viên (Đã yêu cầu từ bước trên).
                                    </p>
                                    <p className="mb-3">
                                        Bước 3: Sau khi được hỗ trợ có mật khẩu mới, sinh viên đăng nhập vào hệ thống
                                        LMS và thực hiện thay đổi mật khẩu mới.
                                    </p>
                                    <span>
                                        <strong>Liên hệ: </strong> 028.3829.3828 (số nhánh 171)
                                    </span>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Quên mật khẩu tài khoản Microsoft Office 365 Education
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p className="mb-0">
                                        Hiện tại sinh viên có thể tự khôi phục mật khẩu tài khoản Microsoft Office 365
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Em không tìm thấy lớp học cho học kỳ hiện tại</Accordion.Header>
                                <Accordion.Body>
                                    <p className="mb-0">
                                        Sinh viên vui lòng liên hệ với Phòng Đào tạo để xem lại tình trạng đăng ký học
                                        phần, môn học.
                                    </p>
                                    <p className="mb-0">
                                        <strong>Liên hệ: </strong> 028.3829.3828 (số nhánh 171)
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
                {/* Giảng viên FAQs */}
                <h4 className="FAQSection_student text-center mt-5">
                    <div className="divider-div">
                        <FaUserTie className="icon-style1" />
                    </div>
                    <p className="mb-0">Giảng viên</p>
                </h4>
                <Row className="section justify-content-center mt-4">
                    <Col lg={10} md={10} sm={12} className="FAQSection__content">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    Hỗ trợ kỹ thuật Hệ thống E-Learning LMS (Giảng viên)
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p className="mb-0">
                                        Sinh viên liên hệ với Phòng Đào tạo để được cấp lại mật khẩu tài khoản LMS.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Tôi không tìm thấy lớp học phần đang giảng dạy</Accordion.Header>
                                <Accordion.Body>
                                    <p className="mb-0">
                                        Thầy/Cô vui lòng liên hệ số Hotline của Tổ Công nghệ thông tin và dữ liệu để
                                        được hỗ trợ trực tiếp.
                                    </p>
                                    <p className="mb-0">
                                        <strong>Hotline: </strong> 028.3829.3828 (số nhánh 171)
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Không đăng nhập vào được tài khoản Email Trường</Accordion.Header>
                                <Accordion.Body>
                                    <p className="mb-0">
                                        Thầy/Cô vui lòng liên hệ số Hotline của Tổ Công nghệ thông tin và dữ liệu để
                                        được hỗ trợ trực tiếp.
                                    </p>
                                    <p className="mb-0">
                                        <strong>Hotline: </strong> 028.3829.3828 (số nhánh 171)
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
