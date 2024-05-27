import React, { Fragment, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { introImage1, introImage2, introImageCNTT1, logoussh } from '../../assets';
import './introSection.css';
import { nhansu, ctv } from '../../datas/nhansu';

export const IntroSectionHCMUSSH = () => {
    return (
        <section className="intro-section">
            <Container fluid className="intro-container" style={{ width: 'var(--container-width-lg)' }}>
                <Row className="mb-4">
                    <Col xs="auto">
                        <h3 className="all-post-header">Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM</h3>
                    </Col>
                </Row>
                <div className="text-center mb-4">
                    <img
                        className="intro-image"
                        style={{ width: '20%', boxShadow: 'none' }}
                        src={logoussh}
                        alt="Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia TP.HCM"
                    />
                </div>
                <Row className="intro-row">
                    <p>
                        Trường Đại học Khoa học Xã hội và Nhân văn,{' '}
                        <Link to={'https://vnuhcm.edu.vn/'}>Đại học Quốc gia Thành phố Hồ Chí Minh</Link>{' '}
                        (VNUHCM-University of Social Sciences and Humanities) là một thành viên của hệ thống Đại học
                        Quốc gia Thành phố Hồ Chí Minh. Trường được thành lập vào năm 1957 với tiền thân là Đại học Văn
                        Khoa (thuộc Viện Đại học Sài Gòn), Đại học Tổng hợp TP. Hồ Chí Minh. Trường là trung tâm nghiên
                        cứu, đào tạo trong lĩnh vực khoa học xã hội và nhân văn lớn nhất miền Nam.
                    </p>
                    <p>
                        Trường đào tạo 34 ngành bậc Đại học, 33 ngành bậc Thạc sĩ, 18 ngành bậc Tiến sĩ trong 7 lĩnh
                        vực: (1) Khoa học xã hội và Hành vi; (2) Khoa học Nhân văn; (3) Khoa học giáo dục và đào tạo
                        giáo viên; (4) Báo chí và Thông tin; (5) Kinh doanh và Quản lý; (6) Dịch vụ xã hội; (7) Khách
                        sạn, Du lịch, Thể thao và Dịch vụ cá nhân.{' '}
                    </p>
                    <p>
                        Với bề dày lịch sử, truyền thống, vị thế trong hệ thống giáo dục đại học Việt Nam, Nhà trường
                        luôn quy tụ đội ngũ các giảng viên, nhà nghiên cứu, nhà quản lý, nhân viên giỏi tham gia công
                        tác giảng dạy, nghiên cứu, làm việc. Trải qua hơn{' '}
                        <Link
                            to={
                                'https://www.congluan.vn/60-nam-truong-dh-khxh-nv-tp-hcm-di-dau-trong-chuan-hoa-va-hoi-nhap-post31158.html'
                            }
                        >
                            60 năm phát triển
                        </Link>
                        , Nhà trường đã đào tạo cho xã hội nhiều nhà giáo, nhà khoa học, chính trị gia, nhà quản lý, văn
                        nghệ sĩ, doanh nhân...xuất sắc. Cựu sinh viên của Trường đang làm việc ở nhiều quốc gia, vùng
                        lãnh thổ với nhiều lĩnh vực công việc khác nhau.
                    </p>
                </Row>
                <div className="text-center">
                    <img className="intro-image" src={introImage1} alt="Cơ sở Quận 1, Thành phố Hồ Chí Minh" />
                    <div className="caption-section mt-3">
                        <div className="divider-div">
                            <h5 className="img-caption">Cơ sở Quận 1, Thành phố Hồ Chí Minh</h5>
                        </div>
                    </div>
                </div>
                <Row className="intro-row">
                    <p>
                        Trường ĐH KHXH&NV, ĐHQG-HCM có{' '}
                        <Link to={'https://hcmussh.edu.vn/doi-tac-quoc-te'}>quan hệ đối tác</Link> với hơn 250 trường
                        đại học và viện nghiên cứu trên toàn thế giới. Hoạt động hợp tác quốc tế được thực hiện với
                        nhiều hình thức đa dạng: (1) Trao đổi sinh viên và giảng viên theo các chương trình ngắn hạn và
                        dài hạn; (2) Các chương trình học tập ở nước ngoài; (3) Các chương trình đào tạo chung và công
                        nhận tín chỉ lẫn nhau cấp đại học học sau đại học; (4) Các dự án nghiên cứu chung và (5) Tổ chức
                        hội nghị/hội thảo khoa học quốc tế và liên kết xuất bản ấn phẩm khoa học về các vấn đề đương
                        đại.
                    </p>
                    <p>
                        Hiện nay, Nhà trường đang hợp tác nghiên cứu, hợp tác đào tạo với nhiều địa phương, đối tác
                        trong và ngoài nước nhằm nghiên cứu, tư vấn chính sách, phát triển nguồn nhân lực tại địa
                        phương, nhất là các tỉnh, thành phố phía Nam. Nhà trường có mối quan hệ hợp tác tốt đẹp với
                        nhiều tổ chức, doanh nghiệp trong việc tuyển dụng, trao học bổng, hỗ trợ điểm thực tập...cho
                        sinh viên.
                    </p>
                    <p>
                        Sinh viên của Nhà trường đến từ 95 quốc gia và vùng lãnh thổ, nhiều tôn giáo, nhiều chủng tộc...
                        đã đem đến cho không gian đại học những đặc điểm đa văn hóa, quốc tế và đầy bản sắc. Trường ĐH
                        KHXH&NV chú trọng kiến tạo môi trường để người học khám phá, rèn luyện và khẳng định bản thân
                        thông qua hoạt động sinh viên, hoạt động đoàn thể, hoạt động câu lạc bộ, hoạt động gắn kết cộng
                        đồng và liên kết doanh nghiệp.
                    </p>
                    <p>
                        Công tác đảm bảo chất lượng tại Trường ĐH KHXH&NV luôn được quan tâm, thực hiện cam kết chất
                        lượng của Nhà trường đối với xã hội về chất lượng đào tạo.{' '}
                        <Link
                            to={
                                'https://hcmussh.edu.vn/tin-tuc/nhan-giay-chung-nhan-kiem-dinh-chat-luong-cap-co-so-giao-duc-chu-ky-2'
                            }
                        >
                            Nhà trường đã kiểm định chất lượng theo bộ tiêu chuẩn của Bộ Giáo dục và Đào tạo vào năm
                            2022 (chu kỳ II).
                        </Link>
                    </p>
                </Row>
                <div className="text-center">
                    <img className="intro-image" src={introImage2} alt="Cơ sở Thành phố Thủ Đức" />
                    <div className="caption-section mt-3">
                        <div className="divider-div">
                            <h5 className="img-caption">Cơ sở Thành phố Thủ Đức</h5>
                        </div>
                    </div>
                </div>
                <Row className="intro-row">
                    <p>Hiện nay, Nhà trường có hai cơ sở đào tạo:</p>
                    <p>
                        - Cơ sở Quận 1: gồm văn phòng Đảng ủy, Hội đồng trường, Ban Giám hiệu, các phòng/ban, khoa, bộ
                        môn, trung tâm,… đào tạo sau đại học, đào tạo các chương trình dành cho học viên người nước
                        ngoài, các chương trình liên kết quốc tế và chương trình chất lượng cao.
                    </p>
                    <p>
                        - Cơ sở Thành phố Thủ Đức: đào tạo sinh viên bậc đại học với các khu chức năng như nhà làm việc,
                        giảng dạy, nghiên cứu, thư viện, bảo tàng, khu phức hợp thể dục thể thao, dịch vụ,…
                    </p>
                </Row>
            </Container>
        </section>
    );
};

export const IntroSectionCNTTDL = () => {
    useEffect(() => {
        document.title = 'Tổ Công nghệ thông tin và Dữ liệu';
    });
    return (
        <section className="intro-section">
            <Container fluid className="intro-container" style={{ width: 'var(--container-width-lg)' }}>
                <Row className="mb-4">
                    <Col xs="auto">
                        <h3 className="all-post-header">Tổ Công nghệ thông tin và Dữ liệu</h3>
                    </Col>
                </Row>
                <div className="text-center mb-4">
                    <img
                        className="intro-image"
                        src={introImageCNTT1}
                        alt="Ứng dụng Công nghệ thông tin"
                        style={{ width: '60%' }}
                    />
                </div>
                <Row className="intro-row justify-content-end">
                    <p>
                        Tổ Công nghệ thông tin và Dữ liệu hiện đang là một bộ phận trực thuộc Phòng Hành chính - Tổng
                        hợp của Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia TP. Hồ Chí Minh. Nhiệm vụ
                        chủ yếu của Tổ là phát triển và quản lý các hệ thống công nghệ thông tin của trường, hỗ trợ sinh
                        viên (người học) và giảng viên giải quyết các vấn đề liên quan đến tài khoản Email giáo dục
                        (Education), tài khoản hệ thống dạy và học trực tuyến LMS,... của sinh viên, học viên cao học,
                        giảng viên và nhân viên trong Trường.
                    </p>
                    <p>
                        <strong>— Chức năng</strong>
                    </p>
                    <p>
                        Chức năng chính của Tổ là xây dựng, vận hành và bảo trì các hệ thống thông tin của trường, đảm
                        bảo tính ổn định và an toàn của hệ thống. Tổ cũng đảm nhận việc cung cấp việc hỗ trợ kỹ thuật và
                        giải quyết các vấn đề liên quan đến lĩnh vực công nghệ thông tin dành cho người học và giảng
                        viên của Trường Đại học Khoa học Xã hội và Nhân văn, Đại học Quốc gia TP. Hồ Chí Minh.
                    </p>
                    <p>
                        <strong>— Nhiệm vụ</strong>
                    </p>
                    <p>
                        Nhiệm vụ của Tổ là đảm bảo thúc đẩy việc nghiên cứu và ứng dụng công nghệ thông tin trong lĩnh
                        vực giảng dạy và nghiên cứu khoa học, các hoạt động trong công tác của nhà trường cũng như hỗ
                        trợ sinh viên, học viên, giảng viên và nhân viên trong Trường các vấn đề liên quan đến Email
                        Education, tài khoản hệ thống dạy và học trực tuyến LMS,...
                    </p>
                    <p>
                        <strong>— Nhân sự</strong>
                    </p>
                    <Link to={'/gioi-thieu/nhan-su'}>Xem chi tiết</Link>
                    <p></p>
                    <Col xs="auto">
                        <p className="text-center mb-1">
                            <strong>TRƯỜNG ĐẠI HỌC KHOA HỌC XÃ HỘI VÀ NHÂN VĂN, ĐHQG TP.HCM</strong>
                        </p>
                        <p className="text-center mb-5">Phòng Hành chính - Tổng hợp</p>
                        <p className="text-center">
                            <i>Tổ Công nghệ thông tin và Dữ liệu</i>
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export const IntroSectionVolunteer = () => {
    function list_ns(person) {
        return (
            <Col xxl={4} md={6} className="">
                <div key={person.id} className="card_">
                    <img src={person.avatar} alt={person.name} />
                    <div className="info">
                        <h1>{person.name}</h1>
                        <p className="mb-0">{person.position}</p>
                        <p>{person.concur_position}</p>
                        <span className="email-link-card fw-bold">
                            Email:{' '}
                            <Link to={`mailto:${person.email}`} className="mb-3 fw-normal">
                                {person.email}
                            </Link>
                        </span>
                    </div>
                </div>
            </Col>
        );
    }

    return (
        <section className="intro-section">
            <Container fluid className="intro-container" style={{ width: 'var(--container-width-lg)' }}>
                <Row className="mb-4">
                    <Col xs="auto">
                        <h3 className="all-post-header">Cơ cấu nhân sự</h3>
                    </Col>
                </Row>
                <Row className="">
                    {nhansu.map((person) => {
                        return list_ns(person);
                    })}
                </Row>

                <br />
                {/* <h1 className="title_h1">CỘNG TÁC VIÊN</h1>
                <div className="Team">
                    {(window.innerWidth > 768 && window.innerWidth>window.innerHeight) ? (
                        <Fragment>
                            <Row >
                                {ctv.map((person) => {
                                    if (person.id < 4) {
                                        return list_ns(person);
                                    }
                                })}
                            </Row>
                            <Row >
                                {ctv.map((person) => {
                                    if (person.id > 3) {
                                        return list_ns(person);
                                    }
                                })}
                            </Row>
                        </Fragment>
                    ) : (window.innerWidth < 768 || window.innerWidth<window.innerHeight) (
                        <Fragment>
                            {ctv.map((person) => {
                                return <Row className="">{list_ns(person)}</Row>;
                            })}
                        </Fragment>
                    )}
                </div> */}
            </Container>
        </section>
    );
};
