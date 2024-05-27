import { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { form_inputStart, form_inputSuccess, addFormData, deleteFormData } from '../../redux/formSlice';
import FormWizard from 'react-form-wizard-component';
import { Step1_ObjectSel, Step2_Issue, Step3_ContactInfo, Step4_Description, Step5_Submit } from './stepsSuprtForm';
import { Col, Container, Row } from 'react-bootstrap';
import { MdSupportAgent } from 'react-icons/md';
import { toastTrigger } from '~/utils/trigger/swal';

// Styles & Components
import 'react-form-wizard-component/dist/style.css';
import './supportForm.css';
import { sendMailAPI } from '../../utils/nodemailer/sendMail';
const baseURL = process.env.REACT_APP_API_URL;
export const SupportForm = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const handleChange = (event, field) => {
        dispatch(form_inputStart());
        if (field === 'prob') {
            dispatch(addFormData({ [field]: event }));
        } else {
            dispatch(addFormData({ [field]: event.target?.value }));
        }
        // dispatch(deleteFormData());
    };
    const handleSubmit = () => {
        const mailData = {
            subject: `Yêu cầu hỗ trợ - Sinh viên/Cán bộ: ${selector.name}`,
            html: `<h3 style="margin-bottom:"20px">Thông tin yêu cầu hỗ trợ từ Website Tổ Công nghệ thông tin và Dữ liệu</h3>
            <p><strong>Đối tượng:</strong> ${selector.obj}</p>
            <p><strong>Vấn đề:</strong> ${selector.prob}</p>
            <p><strong>Thông tin liên hệ:</strong></p>
            <p>- Họ và tên: ${selector.name}</p>
            <p>- Email Trường: ${selector.emailEdu}</p>
            <p>- Số điện thoại: ${selector.phone} / Email: ${selector.email}</p>
            <p><strong>Mô tả cụ thể:</strong> ${selector.description ? selector.description : ''}</p>
            <p><strong>Thời gian gửi:</strong> ${new Date().toLocaleString()}</p>`,
            bcc: [],
            path: selector.prob === 'Vấn đề khác' ? '' : `./${selector.attachment}`,
            filename: selector.prob === 'Vấn đề khác' ? '' : `${selector.filename}`,
        };
        // console.log(selector);
        sendMailAPI(mailData);
    };

    //Todo: Get data from store
    const selector = useSelector((state) => state.form.form_input?.currentForm);

    const handleNextStep = () => {
        ref.current?.nextTab();
    };
    const handlePrevStep = () => {
        ref.current?.prevTab();
    };
    const stepsData = [
        {
            title: 'Đối tượng',
            icon: 'fa fa-user',
            content: <Step1_ObjectSel handleGetData={handleChange} selector={selector} nextStep={handleNextStep} />,
        },
        {
            title: 'Vấn đề',
            icon: 'fa fa-circle-question',
            content: (
                <Step2_Issue
                    handleGetData={handleChange}
                    selector={selector}
                    nextStep={handleNextStep}
                    prevStep={handlePrevStep}
                />
            ),
        },
        {
            title: 'Thông tin liên hệ',
            icon: 'fa fa-id-card',
            content: (
                <Step3_ContactInfo
                    handleGetData={handleChange}
                    selector={selector}
                    nextStep={handleNextStep}
                    prevStep={handlePrevStep}
                />
            ),
            // isValid: checkValidateTab3(),
            // validation: errorMessagesTab3,
        },
        {
            title: 'Mô tả (nếu có)',
            icon: 'fa fa-comment-dots',
            content: (
                <Step4_Description
                    handleGetData={handleChange}
                    selector={selector}
                    nextStep={handleNextStep}
                    prevStep={handlePrevStep}
                />
            ),
            // isValid: checkValidateTab4(),
            // validation: errorMessagesTab4,
        },
        {
            title: 'Gửi yêu cầu',
            icon: 'fa fa-paper-plane',
            content: (
                <Step5_Submit
                    handleGetData={handleChange}
                    selector={selector}
                    prevStep={handlePrevStep}
                    finish={handleSubmit}
                />
            ),
        },
    ];

    useEffect(() => {
        dispatch(deleteFormData());
    }, []);
    return (
        <section className="onl-support_section">
            <Container fluid className="px-0" style={{ width: 'var(--container-post-width-lg)' }}>
                <Row className="section-header mb-3 d-flex align-items-center">
                    <h3 className="section-title fw-bold">
                        <MdSupportAgent /> Hỗ trợ và giải đáp trực tuyến
                    </h3>
                </Row>

                <FormWizard
                    color="var(--explore-color)"
                    shape="circle"
                    stepSize="xs"
                    nextButtonTemplate={(handleNext) => (
                        <button className="base-button d-none" onClick={handleNext}>
                            Tiếp theo
                        </button>
                    )}
                    backButtonTemplate={(handleBack) => (
                        <button className="base-button d-none" onClick={handleBack}>
                            Quay lại
                        </button>
                    )}
                    finishButtonTemplate={(handleFinish) => (
                        <button className="base-button d-none" onClick={handleFinish}>
                            Gửi yêu cầu
                        </button>
                    )}
                    ref={ref}
                >
                    {stepsData.map((step, index) => (
                        <FormWizard.TabContent key={index} title={step.title} icon={step.icon}>
                            {step.content}
                        </FormWizard.TabContent>
                    ))}
                </FormWizard>
            </Container>
            <style>{`@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");`}</style>
        </section>
    );
};
