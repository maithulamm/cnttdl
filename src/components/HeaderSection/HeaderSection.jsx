import React from 'react';
import { Container } from 'react-bootstrap';
import { headerImage } from '../../assets';
import './headerSection.css';

const baseURL = process.env.REACT_APP_API_URL;

export const HeaderSection = ({ bannerProps }) => {
    return (
        <header className="header-section">
            <Container fluid className="header-container px-0">
                <div className="header-img">
                    <img src={headerImage} alt="Website Tổ Công nghệ thông tin và dữ liệu" />
                </div>
                <div className="header-content d-none">
                    <h3 className="header-title">
                        Tổ Công nghệ thông tin <br /> và Dữ liệu
                    </h3>
                    <p className="header-paragraph text-md pb-4 pt-3">
                        Tổ Công nghệ thông tin và dữ liệu là tổ chuyên môn của khoa Công nghệ thông tin và truyền thông,
                        trường Đại học Khoa học Xã hội và Nhân văn - Đại học Quốc gia TP. Hồ Chí Minh. Tổ có nhiệm vụ
                        đảm bảo công tác hỗ trợ người học và giảng viên các vấn đề liên quan đến nghiên cứu khoa học và
                        chuyển giao công nghệ trong lĩnh vực Công nghệ thông tin và Dữ liệu.
                    </p>
                    <button className="btn header-explore-btn">Khám phá </button>
                </div>
            </Container>
        </header>
    );
};
