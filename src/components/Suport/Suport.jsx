import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import MultiStep from 'react-multistep';
import { Step1, Step2, Step3, Step4, Step5 } from './step';
import { useDispatch, useSelector } from 'react-redux';
import { form_inputStart, form_inputSuccess, addFormData, deleteFormData } from '../../redux/formSlice';
import Swal from 'sweetalert2';

import './suport.css';
import './prog-track.css';

const stepsTitle = [
    { title: '1. Đối tượng cần hỗ trợ', component: <Step1 /> },
    { title: '2. Vấn đề cần hỗ trợ', component: <Step2 /> },
    { title: '3. Thông tin liên hệ', component: <Step3 /> },
    { title: '4. Mô tả (nếu có)', component: <Step4 /> },
    { title: '5. Gửi yêu cầu', component: <Step5 /> },
];

const prevButton = {
    title: 'Quay lại',
    style: {
        backgroundColor: '#0d6efd',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 20px',
        cursor: 'pointer',
        margin: '5px',
        outline: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
};
const nextButton = {
    title: 'Tiếp theo',
    style: {
        backgroundColor: '#0d6efd',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 20px',
        cursor: 'pointer',
        margin: '5px',
        outline: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    },
};

export const Suport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sumitButton = (selector) => {
        const handleSumit = () => {
            // const navigate = useNavigate();
            Swal.fire({
                title: 'Yêu cầu của bạn đã được gửi đi!',
                text: 'Bạn sẽ không thể hoàn tác hành động này!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0d6efd',
                cancelButtonColor: '#0d6efd',
                confirmButtonText: 'Gửi yêu cầu khác',
                cancelButtonText: 'Trở về trang chủ',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                    dispatch(deleteFormData());
                } else if (result.isDismissed) {
                    navigate('/');
                    setTimeout(() => {}, 1000);
                    dispatch(deleteFormData());
                }
            });
        };
        return (
            <Fragment>
                {selector?.step ? (
                    <Container>
                        <Row>
                            <button class="cssbuttons-io-button" onClick={() => handleSumit()}>
                                Gửi yêu cầu
                                <div class="icon">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                            </button>
                        </Row>
                    </Container>
                ) : null}
            </Fragment>
        );
    };

    useEffect(() => {
        dispatch(form_inputStart());
        dispatch(addFormData({ step: null }));
    }, []);
    return (
        <Fragment>
            <Container style={{ paddingTop: '5vh', color: '#0139a6' }}>
                <h3 className="fw-bold">HỖ TRỢ, GIẢI ĐÁP THẮC MẮC TRỰC TUYẾN</h3>
            </Container>
            <Container fluid className="Suport p-4" style={{ maxWidth: 'var(--container-width-sm)' }}>
                <Row className="justify-content-center text-center align-items-center" style={{ height: '70vh' }}>
                    <MultiStep steps={stepsTitle} prevButton={prevButton} nextButton={nextButton} />
                </Row>
            </Container>
            {sumitButton(useSelector((state) => state.form.form_input?.currentForm))}
        </Fragment>
    );
};
