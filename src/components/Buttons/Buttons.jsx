import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleUp } from 'react-icons/fa';
import { MdOutlineSupportAgent, MdLocalPhone, MdEmail, MdLanguage, MdLiveHelp } from 'react-icons/md';
import './buttons.css';

export const ButtonScrollTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    return (
        <div className="top-to-btm">
            {' '}
            {showTopBtn && <FaAngleUp className="icon-position icon-style" onClick={goToTop} />}{' '}
        </div>
    );
};

export const FloatingButton = () => {
    return (
        <div className="fab-container">
            <div className="fab shadow">
                <div className="fab-content">
                    <MdOutlineSupportAgent className="material-icons" />
                </div>
            </div>
            <div className="sub-button shadow">
                <Link to="tel:(+84)2838293828" target="_blank" title="Hotline">
                    <MdLocalPhone className="material-icons" />
                </Link>
            </div>
            <div className="sub-button shadow">
                <Link to="mailto:tocnttvadl@hcmussh.edu.vn" target="_blank" title="Gmail">
                    <MdEmail className="material-icons" />
                </Link>
            </div>
            <div className="sub-button shadow">
                <Link to="https://cnttdl.hcmussh.edu.vn/" target="_blank" title="Website thông tin chính thức">
                    <MdLanguage className="material-icons" />
                </Link>
            </div>
            <div className="sub-button shadow">
                <Link to="/lien-he" target="_blank" title="Hỏi đáp">
                    <MdLiveHelp className="material-icons" />
                </Link>
            </div>
        </div>
    );
};
